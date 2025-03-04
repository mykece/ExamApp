using BAExamApp.Dtos.Attributes;
using BAExamApp.Dtos.BreadcrumbItem;
using System.Reflection;

public class BreadcrumbService : IBreadcrumbService
{
    private readonly Assembly _mvcAssembly;

    public BreadcrumbService()
    {
        // Uygulama başlangıcında assembly yüklemesi yapılır.
        _mvcAssembly = Assembly.Load("BAExamApp.MVC");
    }

    public List<BreadcrumbItemDto> GenerateBreadcrumbs(string area, string controller, string action, bool isHomePage, bool isLoginPage)
    {
        var breadcrumbs = new List<BreadcrumbItemDto>();

        // Eğer giriş ekranı (isLoginPage) veya ana sayfa (isHomePage) ise, breadcrumb'ı hiç eklemeyiz.
        if (isLoginPage || isHomePage)
        {
            return breadcrumbs; // Boş bir liste döner, yani breadcrumb yok.
        }

        // Eğer area varsa, "Anasayfa" linki, o area'ya yönlendirecek şekilde eklenir.
        if (!string.IsNullOrEmpty(area))
        {
            breadcrumbs.Add(new BreadcrumbItemDto { Title = "Home", Url = $"/{area}" });
        }
        else
        {
            // Eğer area yoksa, "Anasayfa" linki görünmeyecek.
            breadcrumbs.Add(new BreadcrumbItemDto { Title = "Home", Url = "/" });
        }

        // Eğer controller varsa, breadcrumb listesine eklenir.
        if (!string.IsNullOrEmpty(controller) && !controller.Equals("Question", StringComparison.OrdinalIgnoreCase))
        {
            string controllerName = GetDisplayName(controller, null); // Controller için BreadcrumbName al
            breadcrumbs.Add(new BreadcrumbItemDto { Title = controllerName, Url = $"/{area}/{controller}" });
        }

        // Eğer action varsa ve action "Index" değilse, breadcrumb listesine eklenir.
        if (!string.IsNullOrEmpty(action) && !action.Equals("Index", StringComparison.OrdinalIgnoreCase))
        {
            string actionName = GetDisplayName(controller, action); // Action için BreadcrumbName al
            breadcrumbs.Add(new BreadcrumbItemDto { Title = actionName, Url = $"/{area}/{controller}/{action}" });
        }

        return breadcrumbs;
    }

    public string GetDisplayName(string controllerName, string actionName)
    {
        var controllerType = _mvcAssembly.GetTypes()
            .FirstOrDefault(t => t.Name.Equals($"{controllerName}Controller", StringComparison.OrdinalIgnoreCase));

        if (controllerType == null) return controllerName;

        // Controller için DisplayName veya BreadcrumbName kontrolü
        if (string.IsNullOrEmpty(actionName))
        {
            var controllerAttribute = controllerType.GetCustomAttribute<BreadcrumbNameAttribute>();
            return controllerAttribute?.Name ?? controllerName;
        }

        // Action için DisplayName veya BreadcrumbName kontrolü
        var actionMethod = controllerType.GetMethods()
            .FirstOrDefault(m => m.Name.Equals(actionName, StringComparison.OrdinalIgnoreCase));

        if (actionMethod == null) return actionName;

        var actionAttribute = actionMethod.GetCustomAttribute<BreadcrumbNameAttribute>();
        return actionAttribute?.Name ?? actionName;
    }
}