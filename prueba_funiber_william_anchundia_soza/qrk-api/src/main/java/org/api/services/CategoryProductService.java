package org.api.services;

import org.api.models.CategoryProduct;
import org.api.models.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class CategoryProductService {
    private EntityManager em;

    final Logger log = LoggerFactory.getLogger(this.getClass());

    public CategoryProductService(EntityManager em) {
        this.em = em;
    }

    public CategoryProduct getCategoryProductForId(Integer idCategoryProduct){
        CategoryProduct categoryProduct = new CategoryProduct();
        try{
            categoryProduct = em.createQuery("select a from CategoryProduct a where a.idCategoryProduct = :idCategoryProduct " , CategoryProduct.class)
                    .setParameter("idCategoryProduct",idCategoryProduct)
                    .getSingleResult();
        }catch (Exception e){
            log.error("getCategoryProductForId: {}", e.getMessage());
        }
        return categoryProduct;
    }

    public List<CategoryProduct> getAll(){
        return em.createQuery("Select a from CategoryProduct a", CategoryProduct.class).getResultList();
    }

    @Transactional
    public void create(CategoryProduct categoryProduct){
        em.persist(categoryProduct);
    }

    @Transactional
    public void update(CategoryProduct categoryProduct){
        em.merge(categoryProduct);
    }

    @Transactional
    public void delete(CategoryProduct categoryProduct){
        em.remove(em.contains(categoryProduct) ? categoryProduct : em.merge(categoryProduct));
    }
}