import { Fragment } from 'react';
import { SidebarDashlite } from '../Sidebar';
import { HeaderDashlite } from '../Header';
import { FooterDashlite } from '../Footer';
import Preloader from '../Preloader';

const LayoutDashlite = ({
    children,
    user,
    busy,
    setBusy, 
    isSidebarShown,
    setIsSidebarShown
}) => {
    if (busy) {
        return <Preloader />;
    }
    return (
        <Fragment>
            <div className="nk-app-root">
                <div className="nk-main ">
                    <SidebarDashlite
                        user={ user }
                        isSidebarShown={ isSidebarShown }
                        setIsSidebarShown={ setIsSidebarShown }
                    />
                    <div className="nk-wrap">
                        <HeaderDashlite
                            user={ user }
                            setBusy={ setBusy }
                            isSidebarShown={ isSidebarShown }
                            setIsSidebarShown={ setIsSidebarShown }
                        />
                        <div className="nk-content">
                            <div className="container-fluid">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        { children }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FooterDashlite />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default LayoutDashlite;
