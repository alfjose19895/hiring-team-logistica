package org.api.managements;

import org.api.models.CategoryProduct;
import org.api.models.HistoryProduct;
import org.api.models.Person;
import org.api.models.Product;
import org.api.objects.ResponseStandarBuilder;
import org.api.services.CategoryProductService;
import org.api.services.HistoryProductService;
import org.api.services.ProductService;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ProductManagement {

    @Inject
    ProductService productService;

    @Inject
    HistoryProductService historyProductService;

    @Inject
    CategoryProductService categoryProductService;

    public Response getProductForId(Integer id){
        try{
            Product product = this.productService.getProductForId(id);
            if(product.getIdProduct() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Creado sin novedades", product);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALLForId ", e.getMessage());
        }
    }

    public Response getProductAllSearch(String typeFilter, String valueFilter){
        try{
            List<Product> products = this.productService.getProductAllSearch(typeFilter,valueFilter);
            if(products.isEmpty()){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Sin novedades", products);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener getProductAllSearch ", e.getMessage());
        }
    }

    public Response getAllProducts(){
        try {
            List<Product> products = new ArrayList<>();
            products.addAll(this.productService.getAll());
            if (products.isEmpty()) {
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Sin novedades", products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALL ", e.getMessage());
        }
    }

    public Response postProduct(Product product){
        try{
            CategoryProduct existCategoryProduct = this.categoryProductService.getCategoryProductForId(product.getIdCategoryProduct());
            if(existCategoryProduct.getIdCategoryProduct() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "La category no existe");
            }

            this.productService.create(product);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al CREAR EL PRODUCTO", e.getMessage());
        }
    }

    public Response putProduct(Product product){
        try{
            Product existProduct = this.productService.getProductForId(product.getIdProduct());
            if(existProduct.getIdProduct() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "El producto no existe");
            }

            CategoryProduct existCategoryProduct = this.categoryProductService.getCategoryProductForId(product.getIdCategoryProduct());
            if(existCategoryProduct.getIdCategoryProduct() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "La category no existe");
            }

            HistoryProduct historyProduct = new HistoryProduct(0,existProduct.getIdProduct(),existProduct.getCodeProduct(),existProduct.getNameProduct(),existProduct.getIdCategoryProduct(),"cambiar el correo back");
            this.historyProductService.create(historyProduct);
            product.setHasStock(existProduct.getHasStock());
            this.productService.update(product);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Actualizado sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al ACTUALIZAR EL PRODUCTO", e.getMessage());
        }
    }

    public Response deleteProduct(Integer id){
        try{
            Product product = this.productService.getProductForId(id);
            if(product.getIdProduct() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "El producto no existe");
            }
            this.productService.delete(product);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Eliminado sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al eliminar EL PRODUCTO", e.getMessage());
        }
    }
}
