package org.api.managements;

import org.api.models.CategoryProduct;
import org.api.objects.ResponseStandarBuilder;
import org.api.services.CategoryProductService;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class CategoryProductManagement {
    @Inject
    CategoryProductService categoryProductService;

    public Response getCategoryProductForId(Integer id){
        try{
            CategoryProduct categoryProduct = this.categoryProductService.getCategoryProductForId(id);
            if(categoryProduct.getIdCategoryProduct() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Respuesta sin novedades", categoryProduct);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALLForId ", e.getMessage());
        }
    }

    public Response getAllCategoryProducts(){
        try {
            List<CategoryProduct> categoryProducts = new ArrayList<>();
            categoryProducts.addAll(this.categoryProductService.getAll());
            if (categoryProducts.isEmpty()) {
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Sin novedades", categoryProducts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALL ", e.getMessage());
        }
    }

    public Response postCategoryProduct(CategoryProduct categoryProduct){
        try{
            this.categoryProductService.create(categoryProduct);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al CREAR LA CATEGORIA DEL PRODUCTO", e.getMessage());
        }
    }

    public Response putCategoryProduct(CategoryProduct categoryProduct){
        try{
            this.categoryProductService.update(categoryProduct);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Actualizado sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al ACTUALIZAR LA CATEGORIA DEL PRODUCTO", e.getMessage());
        }
    }

    public Response deleteCategoryProduct(Integer id){
        try{
            CategoryProduct categoryProduct = this.categoryProductService.getCategoryProductForId(id);
            if(categoryProduct.getIdCategoryProduct() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "la categoria no existe");
            }
            this.categoryProductService.delete(categoryProduct);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Eliminado sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al eliminar LA CATEGORIA DEL PRODUCTO", e.getMessage());
        }
    }
}
