package org.api.managements;

import org.api.models.HistoryProduct;
import org.api.models.Product;
import org.api.objects.ResponseStandarBuilder;
import org.api.services.HistoryProductService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class HistoryProductManagement {

    @Inject
    HistoryProductService historyProductService;

    public Response getHistoryProductForId(Integer id){
        try{
            HistoryProduct historyProduct = this.historyProductService.getHistoryProductForId(id);
            if(historyProduct.getIdHistoryProduct() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Creado sin novedades", historyProduct);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALLForId ", e.getMessage());
        }
    }

    public Response getAllHistoryProducts(){
        try {
            List<HistoryProduct> historyProducts = new ArrayList<>();
            historyProducts.addAll(this.historyProductService.getAll());
            if (historyProducts.isEmpty()) {
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Sin novedades", historyProducts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALL ", e.getMessage());
        }
    }

}
