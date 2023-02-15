package org.api.controllers;

import org.api.managements.ProductManagement;
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

@Path("product")
@RequestScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Timed
public class ProductController {

    @Inject
    ProductManagement productManagement;

    @GET
    @RolesAllowed({"Admin"})
    @Path("{id}")
    @Operation(summary = "Obtener todos por id", description = "Obtener todos por id")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = Product.class, name = "Product"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(@PathParam("id") Integer id){
        return this.productManagement.getProductForId(id);
    }

    @GET
    @RolesAllowed({"Admin"})
    @Path("allSearch/{typeFilter}/{valueFilter}")
    @Operation(summary = "Obtener todos por filtro", description = "Obtener todos por el filtro")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = Product.class, name = "Product"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(@PathParam("typeFilter") String typeFilter,@PathParam("valueFilter") String valueFilter){
        return this.productManagement.getProductAllSearch(typeFilter, valueFilter);
    }

    @GET
    @RolesAllowed({"Admin"})
    @Path("all")
    @Operation(summary = "Obtener todos", description = "Obtener todos")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = Product.class, name = "Product"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(){
        return this.productManagement.getAllProducts();
    }

    @POST
    @RolesAllowed({"Admin"})
    @Operation(summary = "Crear", description = "Crea un nuevo")
    @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(type = SchemaType.OBJECT,
            implementation = Product.class)), description = "prueba VM", required = true)
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response crearProduct(Product product){
        return this.productManagement.postProduct(product);
    }

    @PUT
    @RolesAllowed({"Admin"})
    @Operation(summary = "Modificar", description = "modificar elemento")
    @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(type = SchemaType.OBJECT,
            implementation = Product.class)), description = "prueba VM", required = true)
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response modificarProduct(Product product){
        return this.productManagement.putProduct(product);
    }

    @DELETE
    @Path("{id}")
    @RolesAllowed({"Admin"})
    @Operation(summary = "eliminar", description = "eliminar elemento")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response eliminarProduct(@PathParam("id") Integer id){
        return this.productManagement.deleteProduct(id);
    }
}
