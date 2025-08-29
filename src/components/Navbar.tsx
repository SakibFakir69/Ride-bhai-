import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logo from "./Logo";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router"; // ✅ Fixed import
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const { role } = data?.data || {};

  const roleBasedNavbar = (role: string) => {
    if (role === "RIDER") {
      return [
        { href: "/ride/book-ride", label: "Book Ride" },
        { href: "/ride/history", label: "History" },
        { href: "/ride/ride-details", label: "Ride Details" },
        { href: "/profile", label: "Profile" },
      ];
    } else if (role === "DRIVER") {
      return [
        { href: "driver/request", label: "Incoming Requests" },
        
        { href: "driver/driver-history", label: "History" },
        { href: "driver/Earning", label: "Earning" },
        { href: "profile", label: "Profile" },
      ];


    } else if (role === "ADMIN") {
      return [
        { href: "admin/user-management", label: "User Management" },
        { href: "admin/ride-oversight", label: "Ride Oversight" },
        { href: "admin/dashboard", label: "Dashboard" },
      ];
    } else {
      return [
        { href: "/", label: "Home" },
        { href: "/features", label: "Features" },
        { href: "/about", label: "About" },
        { href: "/faq", label: "Faq" },
        { href: "/contact", label: "Contact" },
      ];
    }
  };

  const navigationLinks = roleBasedNavbar(role || "");

  return (
    <header className="border-b px-4 md:px-6 fixed w-full z-50 backdrop-blur-3xl">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                {/* SVG icon code remains the same */}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link: any, index: any) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <Link to={link.href} className="py-1.5">
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link: any, index: any) => (
                  <NavigationMenuItem key={index}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {data?.data?.email && <Button>Log Out</Button>}
          {!data?.data?.email && (
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link to={"/auth/login"}>Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
