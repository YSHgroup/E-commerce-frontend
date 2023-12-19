import { useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";

const MobileMenuNav = ({ getActiveStatus, menu }) => {
  useEffect(() => {
    const offCanvasNav = document.querySelector(
      "#offcanvas-mobile-menu__navigation"
    );
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(
      ".mobile-sub-menu"
    );
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", (e) => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        getActiveStatus(false);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };

  const printMenuBranch = (branch) => (
    branch && (
      <ul className="mobile-sub-menu">
        { branch.map((element, index) => (
          <li
            className={ !!element.children?.length ? "menu-item-has-children" : "" }
            key={ index }
          >
            <Link
              href={`/products/${element.slug}`}
              as={process.env.PUBLIC_URL + "/products/" + element.slug}
            >
              { element.name }
            </Link>
            { !!element.children?.length && (
              <ul className="mobile-sub-menu">
                { !!element.children?.length && element.children.map((subelement, subindex) => (
                  <li
                    className={ !!subelement.children?.length ? "menu-item-has-children" : "" }
                    key={ subindex }
                  >
                    <Link
                      href={`/products/${ subelement.slug }`}
                      as={process.env.PUBLIC_URL + "/products/" + subelement.slug}
                    >
                      { subelement.name }
                    </Link>
                    { !!subelement.children?.length && (
                      <ul className="mobile-sub-menu">
                        { !!subelement.children?.length && subelement.children.map((sub2element, sub2index) => (
                          <li key={ sub2index }>
                            <Link
                              href={`/products/${ sub2element.slug }`}
                              as={process.env.PUBLIC_URL + "/products/" + sub2element.slug}
                            >
                              { sub2element.name }
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    )
  );

  return (
    <nav
      className="offcanvas-mobile-menu__navigation"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
        <li className={ menu.models ? "menu-item-has-children" : ""}>
          <Link href="/" as={process.env.PUBLIC_URL + "/products"}>
            Products
          </Link>
          { printMenuBranch(menu.models) }
        </li>
        <li className={ menu.rooms ? "menu-item-has-children" : ""}>
          <Link href="/" as={process.env.PUBLIC_URL + "/products"}>
            Rooms
          </Link>
          { printMenuBranch(menu.rooms) }
        </li>
        <li>
          <Link href="/brands" as={process.env.PUBLIC_URL + "/brands"}>
            Brands
          </Link>
        </li>
        <li>
          <Link href="/" as={process.env.PUBLIC_URL + "/inspiration"}>
            Inspiration
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    menu: state.menuData,
  };
}

export default connect(mapStateToProps)(MobileMenuNav);
