package org.api.services;

import org.api.models.Person;
import org.api.models.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
public class ProductService {
    private EntityManager em;

    final Logger log = LoggerFactory.getLogger(this.getClass());

    public ProductService(EntityManager em) {
        this.em = em;
    }

    public Product getProductForId(Integer idProduct){
        Product product = new Product();
        try{
            product = em.createQuery("select a from Product a where a.idProduct = :idProduct " , Product.class)
                    .setParameter("idProduct",idProduct)
                    .getSingleResult();
        }catch (Exception e){
            log.error("getProductForId: {}", e.getMessage());
        }
        return product;
    }

    public List<Product> getProductAllSearch(String typeFilter, String valueFilter){
        try{
            if (Objects.equals(typeFilter, "nameProduct")){
                return em.createQuery("select a from Product a " +
                                "where a.nameProduct = :valueFilter ", Product.class)
                        .setParameter("valueFilter",valueFilter).getResultList();
            }else if (Objects.equals(typeFilter, "codeProduct")){
                return em.createQuery("select a from Product a " +
                                "where a.codeProduct = :valueFilter ", Product.class)
                        .setParameter("valueFilter",valueFilter).getResultList();
            }else if (Objects.equals(typeFilter, "hasStock")){
                return em.createQuery("select a from Product a " +
                                "where a.hasStock = :valueFilter", Product.class)
                        .setParameter("valueFilter",valueFilter).getResultList();
            }
        }catch (Exception e){
         log.error(e.getMessage());
        }
        return em.createQuery("select a from Product a ", Product.class)
                .setParameter("valueFilter",valueFilter).getResultList();
    }

    public List<Product> getAll(){
        return em.createQuery("Select a from Product a", Product.class).getResultList();
    }

    @Transactional
    public void create(Product product){
        em.persist(product);
    }

    @Transactional
    public void update(Product product){
        em.merge(product);
    }

    @Transactional
    public void delete(Product product){
        em.remove(em.contains(product) ? product : em.merge(product));
    }
}
