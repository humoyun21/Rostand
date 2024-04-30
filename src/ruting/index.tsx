import { Brands, Products, Models } from "@pages";
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

interface dataNavInterface {
    title: string;
    path: string;
    icon: JSX.Element;
    component: JSX.Element 
}

const  dataNav: dataNavInterface[] = [
    {
        title: "Brands",
        path: "brands",
        icon: <BrandingWatermarkIcon/>,
        component: <Brands />
    },
    {
        title: "Models",
        path: "models",
        icon: <ModelTrainingIcon />,
        component: <Models />
    },
    {
        title: "Products",
        path: "products",
        icon: <ProductionQuantityLimitsIcon/>,
        component: <Products />
    }
]


export default dataNav;