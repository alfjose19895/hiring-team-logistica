package org.api.controllers;

import org.api.managements.CategoryProductManagement;
import org.api.models.CategoryProduct;
import org.api.models.Product;
import org.eclipse.microprofile.metrics.annotation.Timed;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("category-product")
@RequestScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Timed
public class CategoryProductController {
    @Inject
    CategoryProductManagement categoryProductManagement;

    @GET
    @RolesAllowed({"Admin"})
    @Path("{id}")
    @Operation(summary = "Obtener todos por id", description = "Obtener todos por id")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = CategoryProduct.class, name = "Product"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(@PathParam("id") Integer id){
        return this.categoryProductManagement.getCategoryProductForId(id);
    }

    @GET
    @RolesAllowed({"Admin"})
    @Path("all")
    @Operation(summary = "Obtener todos", description = "Obtener todos")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = CategoryProduct.class, name = "Product"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(){
        return this.categoryProductManagement.getAllCategoryProducts();
    }

    @POST
    @RolesAllowed({"Admin"})
    @Operation(summary = "Crear", description = "Crea un nuevo")
    @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(type = SchemaType.OBJECT,
            implementation = CategoryProduct.class)), description = "prueba VM", required = true)
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response crearCategoryProduct(CategoryProduct categoryProduct){
        return this.categoryProductManagement.postCategoryProduct(categoryProduct);
    }

    @PUT
    @RolesAllowed({"Admin"})
    @Operation(summary = "Modificar", description = "modificar elemento")
    @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(type = SchemaType.OBJECT,
            implementation = CategoryProduct.class)), description = "prueba VM", required = true)
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response modificarCategoryProduct(CategoryProduct categoryProduct){
        return this.categoryProductManagement.putCategoryProduct(categoryProduct);
    }

    @DELETE
    @Path("{id}")
    @RolesAllowed({"Admin"})
    @Operation(summary = "eliminar", description = "eliminar elemento")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response eliminarCategoryProduct(@PathParam("id") Integer id){
        return this.categoryProductManagement.deleteCategoryProduct(id);
    }
}
