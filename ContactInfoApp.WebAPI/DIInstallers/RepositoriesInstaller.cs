namespace ContactInfoApp.WebAPI.DIInstallers
{
    using Castle.MicroKernel.Registration;
    using Castle.MicroKernel.SubSystems.Configuration;
    using Castle.Windsor;
    using ContactInfoApp.Repositories.Implementation;
    using ContactInfoApp.Repositories.Interfaces;
    using ContactInfoApp.Services.Interfaces;
    using ContactInfoApp.Services.Services;


    public class RepositoriesInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IUnitOfWork>().ImplementedBy<UnitOfWork>().LifestylePerWebRequest(),
                Component.For<IContactService>().ImplementedBy<ContactService>().LifestylePerWebRequest());
        }
    }
}