
import React, { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from '@/contexts/AuthContext';
import { getRoleName } from '@/utils/roleUtils';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showBreadcrumbs?: boolean;
  actions?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  showBreadcrumbs = true, 
  actions 
}) => {
  const location = useLocation();
  const { role } = useAuth();
  const paths = location.pathname.split('/').filter(Boolean);
  
  const getBreadcrumbTitle = (path: string, index: number): string => {
    // Special case for athlete ID page
    if (path.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/) || 
        (paths[index-1] === 'athlete' && !['dashboard', 'goals', 'training', 'wellness'].includes(path))) {
      return 'Athlete Details';
    }
    
    // Format the path
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };
  
  const generateBreadcrumbPath = (index: number): string => {
    return '/' + paths.slice(0, index + 1).join('/');
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 space-y-6">
      {showBreadcrumbs && paths.length > 0 && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            
            {paths.map((path, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index === paths.length - 1 ? (
                    <BreadcrumbPage>{getBreadcrumbTitle(path, index)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={generateBreadcrumbPath(index)}>{getBreadcrumbTitle(path, index)}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < paths.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold gradient-text">{title}</h1>
          {actions && <div>{actions}</div>}
        </div>
      )}
      
      {children}
    </div>
  );
};

export default PageLayout;
