import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ComprasModule } from './compras/compras.module';
import { VentasModule } from './ventas/ventas.module';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ClientsModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProveedoresModule,
    ComprasModule,
    VentasModule,
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
