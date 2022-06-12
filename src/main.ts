import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";


async function start(){
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Название документации')
    .setDescription('Описание документации')
    .setVersion('1.0.0')
    .addTag('MyServer')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.useGlobalPipes(new ValidationPipe()).enableCors()

  await app.listen(PORT, () => console.log(`server started on port = ${PORT}`))

}

start()