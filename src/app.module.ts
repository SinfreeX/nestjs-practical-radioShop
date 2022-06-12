import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { CategoryModule } from "./products/categories/category.module";
import { ProductsModule } from './products/products.module';
import { AttributesModule } from './products/attributes/attributes.module';
import { MeasuresModule } from "./products/attributes/measures/measures.module";
import { AutocompleteModule } from "./autocomplete/autocomplete.module";
import { UpFilesModel } from "./products/files/upFiles.model";
import { UpFilesModule } from "./products/files/upFiles.module";

//вообще модели должна автоматически парситься и добавляться если в их модулях они были добавлены методом forFeature()

@Module ({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname,'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [User, Role, UserRoles, Post,
      ],
      autoLoadModels: true
    }),
    UsersModule, RolesModule, AuthModule,
    PostsModule, FilesModule, CategoryModule,
    ProductsModule, ProductsModule, AttributesModule,
    MeasuresModule, AutocompleteModule,
    UpFilesModule
  ]
})
export class AppModule {}