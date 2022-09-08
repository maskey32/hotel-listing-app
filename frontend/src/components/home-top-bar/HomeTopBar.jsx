import './HomeTopBar.css'
import { AdvertComponent } from '../advert';
import { NavComponent } from '../nav';

export const HomeTopBar = () => {
    return (
        <div className='container'>
            <NavComponent />
            <AdvertComponent />
        </div>
    );
};