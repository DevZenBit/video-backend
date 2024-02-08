import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { diskStorage } from 'multer';

import { MoviesService } from 'src/movies/movies.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { CreateMovieReqDto } from 'src/movies/dto/create-movie-req.dto';
import { CreateMovieRespDto } from 'src/movies/dto/create-movie-resp.dto';
import { UpdateMovieRespDto } from 'src/movies/dto/update-movie-resp.dto';
import { UpdateMovieReqDto } from 'src/movies/dto/update-movie-req.dto';
import { DeleteMovieRespDto } from 'src/movies/dto/delete-movie-resp.dto';
import { GetMovieByIdRespDto } from 'src/movies/dto/get-movie-by-id-resp.dto';
import { UserExistsGuard } from 'src/guards/user.guard';
import { GetMoviesRespDto } from 'src/movies/dto/get-movies-resp.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private configService: ConfigService,
  ) {}

  @ApiResponse({ status: 200, type: GetMoviesRespDto })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsersMovies(
    @Request() req,
    @Query('skipPages') skipPages: number,
    @Query('pageSize') pageSize: number,
  ): Promise<GetMoviesRespDto> {
    const { movies, totalCount } =
      await this.moviesService.getMoviesByUserIdWithTotal(
        req.user.id,
        skipPages,
        pageSize,
      );

    return { movies, totalCount };
  }

  @ApiResponse({ status: 200, type: GetMovieByIdRespDto })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:movieId')
  async getMovieById(
    @Param('movieId') movieId: number,
  ): Promise<GetMovieByIdRespDto> {
    const movie = await this.moviesService.getMovieById(movieId);

    return { movie };
  }

  @ApiResponse({ status: 200, type: CreateMovieRespDto })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, UserExistsGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './client',
        filename: (req, file, cb) => {
          const randomName = `${new Date().getTime()}-${Math.round(
            Math.random() * 10000,
          ).toString(5)}`;

          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 1000000 },
    }),
  )
  @Post()
  async createMovie(
    @UploadedFile()
    file: Express.Multer.File,
    @Request() req,
    @Body() createMovieDto: CreateMovieReqDto,
  ): Promise<CreateMovieRespDto> {
    if (!file) {
      throw new BadRequestException('File required');
    }

    const allowedTypes = ['.png', '.jpeg', '.jpg'];

    if (!allowedTypes.includes(extname(file.originalname).toLowerCase())) {
      throw new BadRequestException('Invalid file type');
    }

    if (file.size > 1000000) {
      throw new BadRequestException('File size exceeds limit');
    }

    const ROOT_URL = this.configService.get('ROOT_URL');

    const posterUrl = `${ROOT_URL}/${file.filename}`;

    const movie = await this.moviesService.createMovie(
      req.user,
      createMovieDto,
      posterUrl,
    );

    delete movie.user;

    return { movie };
  }

  @ApiResponse({ status: 200, type: UpdateMovieRespDto })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, UserExistsGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './client',
        filename: (req, file, cb) => {
          const randomName = `${new Date().getTime()}-${Math.round(
            Math.random() * 10000,
          ).toString(5)}`;

          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 1000000 },
    }),
  )
  @Patch('/:movieId')
  async updateMovie(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('movieId') movieId: number,
    @Request() req,
    @Body() createMovieDto: UpdateMovieReqDto,
  ): Promise<UpdateMovieRespDto> {
    if (file) {
      const allowedTypes = ['.png', '.jpeg', '.jpg'];

      if (!allowedTypes.includes(extname(file.originalname).toLowerCase())) {
        throw new BadRequestException('Invalid file type');
      }

      if (file.size > 1000000) {
        throw new BadRequestException('File size exceeds limit');
      }
    }

    const ROOT_URL = this.configService.get('ROOT_URL');

    const posterUrl = file ? `${ROOT_URL}/${file.filename}` : undefined;

    const movie = await this.moviesService.updateMovie(
      movieId,
      req.user,
      createMovieDto,
      posterUrl,
    );

    return { movie };
  }

  @ApiResponse({ status: 200, type: DeleteMovieRespDto })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, UserExistsGuard)
  @Delete('/:movieId')
  async deleteMovie(
    @Param('movieId') movieId: number,
    @Request() req,
  ): Promise<DeleteMovieRespDto> {
    await this.moviesService.removeMovie(movieId, req.user);

    return { success: true };
  }
}
