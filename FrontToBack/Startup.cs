using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(FrontToBack.Startup))]

namespace FrontToBack
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
