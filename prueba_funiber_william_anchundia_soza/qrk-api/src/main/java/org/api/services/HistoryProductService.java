package org.api.services;

import org.api.models.HistoryProduct;
import org.api.models.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class HistoryProductService {
    private EntityManager em;

    final Logger log = LoggerFactory.getLogger(this.getClass());

    public HistoryProductService(EntityManager em) {
        this.em = em;
    }

    public HistoryProduct getHistoryProductForId(Integer idHistoryProduct){
        HistoryProduct historyProduct = new HistoryProduct();
        try{
            historyProduct = em.createQuery("select a from HistoryProduct a where a.idHistoryProduct = :idHistoryProduct " , HistoryProduct.class)
                    .setParameter("idHistoryProduct",idHistoryProduct)
                    .getSingleResult();
        }catch (Exception e){
            log.error("getHistoryProductForId: {}", e.getMessage());
        }
        return historyProduct;
    }

    public List<HistoryProduct> getAll(){
        return em.createQuery("Select a from HistoryProduct a", HistoryProduct.class).getResultList();
    }

    @Transactional
    public void create(HistoryProduct historyProduct){
        em.persist(historyProduct);
    }

    @Transactional
    public void update(HistoryProduct historyProduct){
        em.merge(historyProduct);
    }

    @Transactional
    public void delete(HistoryProduct historyProduct){
        em.remove(em.contains(historyProduct) ? historyProduct : em.merge(historyProduct));
    }
}
