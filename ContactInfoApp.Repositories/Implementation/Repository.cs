namespace ContactInfoApp.Repositories.Implementation
{
    using ContactInfoApp.Data.Entity;
    using ContactInfoApp.Repositories.Interfaces;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Linq.Expressions;

    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly ContactInfoAppContext Context;
        internal DbSet<TEntity> dbSet;

        public Repository(ContactInfoAppContext context)
        {
            Context = context;
            dbSet = context.Set<TEntity>();
        }

        #region Get
        public TEntity Get(object id)
        {
            return dbSet.Find(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            IQueryable<TEntity> query = dbSet;
            return query.ToList();
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.Where(predicate);
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.SingleOrDefault(predicate);
        }
        #endregion

        #region Add
        public void Add(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            dbSet.AddRange(entities);
        }
        #endregion

        #region update
        public void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            Context.Entry(entityToUpdate).State = EntityState.Modified;
        }
        #endregion

        #region remove
        public void Remove(object id)
        {
            TEntity entityToDelete = this.dbSet.Find(id);
            Remove(entityToDelete);
        }

        public void Remove(TEntity entity)
        {
            dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            dbSet.RemoveRange(entities);
        }
        #endregion
    }
}
