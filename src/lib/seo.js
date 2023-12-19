import { Fragment } from "react";
import { getDiscountPrice } from "./product";
import { useRouter } from "next/router";

export const metaTag = (name, content) => {
    name = name || 'description';
    content = content || '';
    return <meta name={name} content={content} />;
}

export const ogData = options => {
    const router = useRouter()
    const currentURL = router.asPath

    const ogImageContent = (ogProperty) => {
        if (!options.images) {
            return false;
        }
        if (!Array.isArray(options.images)) {
            return <meta property={ogProperty} content={options.images} />;
        }
        return options.images.map((el, index) => {
            return (<meta key={index + ogProperty} property={ogProperty} content={el} />);
        });
    }

    return (
        <Fragment key="ogmain">
            <meta property="og:title" content={options.title || '3d Infinite'} />
            <meta property="og:type" content={options.type || 'website'} />
            { ogImageContent('og:image') }
            { ogImageContent('og:image:secure_url') }
            <meta property="og:url" content={options.url || `${process.env.PUBLIC_BASE_URL}${currentURL}`} />
            <meta property="og:description" content={options.description || '3d Infinite'} />
            <meta property="og:site_name" content="3d Infinite" />
            <meta property="og:locale" content="en_GB" />
            <meta property="og:rich_attachment" content="true" />
            <meta property="business:contact_data:street_address" content="Pod Senovou 2245/40" />
            <meta property="business:contact_data:locality" content="Czech Republic" />
            <meta property="business:contact_data:postal_code" content="78701" />
            <meta property="business:contact_data:country_name" content="Sumperk" />
            <meta property="place:location:latitude" content="49.972667" />
            <meta property="place:location:longitude" content="16.956978" />
            <meta property="business:contact_data:email" content="info@3dinfinite.com"/>
            
            {options.type == 'product.item' || options.type == 'product.group'
                ? <meta property="product:product_link" content={options.url || `${process.env.PUBLIC_BASE_URL}${currentURL}`} /> : ''}
            {options.brand ? <meta property="product:brand" content={options.brand} /> : ''}
            {options.category ? <meta property="product:category" content={options.category} /> : ''}
            {options.type == 'product.item' || options.type == 'product.group'
                ? <meta property="product:availability" content="instock" /> : ''}
            {options.type == 'product.item' || options.type == 'product.group'
                ? <meta property="product:condition" content="new" /> : ''}
            {options.type == 'product.item' || options.type == 'product.group'
                ? <meta property="product:color" content="Various" /> : ''}
            {options.type == 'product.item' || options.type == 'product.group'
                ? <meta property="product:target_gender" content="unisex" /> : ''}
            {options.type == 'product.item' && options.price
                ? <meta property="product:price:amount" content={options.price} /> : ''}
            {options.type == 'product.item' || options.type == 'product.group'
                ? <meta property="product:price:currency" content="USD" /> : ''}
        </Fragment>
    );
}

export const jsonldData = options => {
    const router = useRouter()
    const currentURL = router.asPath
    const dataType = options?.type.toLowerCase() || '';
    let data = ``;

    if (dataType == 'website') {
        data = `{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://3dinfinite.com/",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://api.3dinfinite.com/api/v1/products/autosuggest/{search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
}`;
    } else if (dataType == 'store') {
        data = `{
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "3d Infinite",
    "url": "https://3dinfinite.com/",
    "image": "https://3dinfinite.com/assets/images/3d-infinite-logo.png",
    "logo": "https://3dinfinite.com/assets/images/3d-infinite-logo.png",
    "telephone" : "+88-1990-6886",
    "email": "info@3dinfinite.com",
    "priceRange": "$$",
    "paymentAccepted": "Credit Card",
    "currenciesAccepted": "USD",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Czech Republic, Sumperk",
        "postalCode": "78701",
        "streetAddress": "Pod Senovou 2245/40"
    },
    "location": {
        "@type": "Place",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Czech Republic, Sumperk",
            "postalCode": "78701",
            "streetAddress": "Pod Senovou 2245/40"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "49.972667",
            "longitude": "16.956978"
        }
    },
    "potentialAction": {
        "@type": "SearchAction",
        "target": "${process.env.BASE_URL}/api/v1/products/autosuggest/{search_term_string}",
        "query-input": "required name=search_term_string"
    },
    "contactPoint" : [{
        "@type" : "ContactPoint",
        "telephone" : "+88-1990-6886",
        "contactType" : "customer service"
    }]
}`;
    } else if (dataType == 'article') {
        data = `{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage":{
        "@type":"WebPage",
        "@id": ${JSON.stringify(`${process.env.PUBLIC_BASE_URL}${currentURL}`)}
    },
    "headline": ${JSON.stringify(options.title || '3d Infinite')},
    "image": {
        "@type": "ImageObject",
        "url": ${JSON.stringify(options.image ? options.image : "https://3dinfinite.com/assets/images/3d-infinite-logo.png")}
    },
    "datePublished": "${options.createdAt || '2022-01-01'}",
    "dateModified": "${options.updatedAt || '2022-01-01'}",
    "author": {
        "@type": "Organization",
        "name": "3d Infinite",
        "url": "https://3dinfinite.com/"
    },
    "publisher": {
        "@type": "Organization",
        "image": "https://3dinfinite.com/assets/images/3d-infinite-logo.png",
        "name": "3d Infinite",
        "logo": {
            "@type": "ImageObject",
            "url": "https://3dinfinite.com/assets/images/3d-infinite-logo.png"
        }
    },
    "description": ${JSON.stringify(
        options.description?.replace(/<[^>]+>/g, '') /* replace all tags */ 
        || options.title)}
}`;
    } else if (dataType == 'breadcrumbs') {
        data = `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [${ options?.breadcrumbs?.length
        ? options.breadcrumbs.map((el, index) => (
        `{
            "@type": "ListItem",
            "position": ${index+1},
            "item": {
                "@id": "${el.id}",
                "name": "${el.name}"
            }
        }`
        )).join(',')
        : '' }]
}`;
    } else if (dataType == 'product') {
        let params = {};
        let materials = [];
        if (options && options.parameters.length) {
            options.parameters.map(el => {
                params[el.slug] = el;
                if (el.groupid == 4) {
                    materials.push(el.name);
                }
            });
        }
        data = `{
    "@context": "https://schema.org",
    "@type": "Product",
    "url": ${JSON.stringify(options.url || `${process.env.PUBLIC_BASE_URL}${currentURL}`)},
    "category": ${JSON.stringify(options.category.length ? options.category[0].name : 'Common')},
    "image": ${JSON.stringify(options.image.length ? options.image[0] : '')},
${options.brand ? `    "brand": {"@type": "Brand","name": ${JSON.stringify(options.brand.name)}},` : ''}
${options.brand ? `    "manufacturer": ${JSON.stringify(options.brand.name)},` : ''}
    "sku": ${JSON.stringify(options.sku || options.name || '')},
    "description": ${JSON.stringify(options.fullDescription?.replace(/<[^>]+>/g, '') /* remove all tags from string */
            || options.name || '')},
    "name": ${JSON.stringify(options.name || '')},
    "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/OnlineOnly",
        "price": "${getDiscountPrice(options.price, options.discount)}",
        "priceValidUntil": "${new Date(
            new Date().setMonth(new Date().getMonth() + 6)
        ).toISOString().substring(0, 10)}",
        "url": ${JSON.stringify(options.url || `${process.env.PUBLIC_BASE_URL}${currentURL}`)},
        "priceCurrency": "USD",
        "itemCondition": "https://schema.org/NewCondition"
    },
    "additionalProperty":[{
            "@type": "PropertyValue",
            "name": "Width",
            "value": "${params.width?.value} cm"
        },{
            "@type": "PropertyValue",
            "name": "Height",
            "value": "${params.height?.value} cm"
        },{
            "@type": "PropertyValue",
            "name": "Depth",
            "value": "${params.depth?.value} cm"
        }${params.diameter?.value ? `,{
            "@type": "PropertyValue",
            "name": "Diameter",
            "value": "${params.diameter?.value}"
        }` : ''}${options.brand ? `,{
            "@type": "PropertyValue",
            "name": "Manufacturer",
            "value": "${options.brand?.name}"
        }` : ''}${materials.length ? `,{
            "@type": "PropertyValue",
            "name": "Material",
            "value": ${materials.length == 1
                ? `"${materials.join()}"`
                : `["${materials.join(`","`)}"]`}
        }` : ''}${options.platforms.length ? `,{
            "@type": "PropertyValue",
            "name": "Platform",
            "value": ${options.platforms.length == 1
                ? `"${options.platforms.join()}"`
                : `["${options.platforms.join(`","`)}"]`
            }
        }` : ''}${options.renders.length ? `,{
            "@type": "PropertyValue",
            "name": "Render",
            "value": ${options.renders.length == 1
                ? `"${options.renders.join()}"`
                : `["${options.renders.join(`","`)}"]`
            }
        }` : ''}
    ]
}`;
    } else if (dataType == 'image') {
        data = `{
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "author": "3d Infinite",
    "thumbnailUrl": "${options.image[0]}",
    "contentUrl": "${options.image[0]}",
    "datePublished": "${options.createdAt || '2022-01-01'}",
    "description": ${JSON.stringify(options.fullDescription?.replace(/<[^>]+>/g, '')
        || options.description?.replace(/<[^>]+>/g, '')
        || options.name || options.title || 'Regular Image')},
    "name": ${JSON.stringify(options.name || options.title || 'Image')}
}`;
    } else if (dataType == 'productgroup') {
        data = `{
    "@context": "https://schema.org/",
    "@graph": [
        {
            "@id": "https://3dinfinite.com/${options.group.prefix || ''}${
                options?.group?.slug ? `/${options?.group?.slug}` : ''
            }",
            "@type": "Collection",
            "creator": "3d Infinite",
            "hasPart": [${options?.products?.map(el => `{
                    "@id": "https://3dinfinite.com/product/${el.slug}"
                }`).join(',')}
            ],
            "name": "${options?.group?.title}"
        }${options?.products?.map(el => `,{
            "@id": "https://3dinfinite.com/product/${el.slug}",
            "@type": "Product",
            "isPartOf": "https://3dinfinite.com/products${
                options?.group?.slug ? `/${options?.group?.slug}` : ''
            }",
            "url": "https://3dinfinite.com/product/${el.slug}",
            "category": ${JSON.stringify(el.category.length ? el.category[0] : 'Common')},
            "image": "${el.image.length ? el.image[0] : ''}",
${el.brand ? `            "brand": {"@type": "Brand","name": ${JSON.stringify(el.brand.name)}},` : ''}
${el.brand ? `            "manufacturer": ${JSON.stringify(el.brand.name)},` : ''}
            "sku": ${JSON.stringify(el.sku || el.name)},
            "description": ${JSON.stringify(el.fullDescription?.replace(/<[^>]+>/g, '') /* remove all tags from string */ || el.name)},
            "name": ${JSON.stringify(el.name || '')},
            "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/OnlineOnly",
                "price": "${getDiscountPrice(el.price, el.discount)}",
                "priceValidUntil": "${new Date(
                    new Date().setMonth(new Date().getMonth() + 6)
                ).toISOString().substring(0, 10)}",
                "url": "https://3dinfinite.com/product/${el.slug}",
                "priceCurrency": "USD",
                "itemCondition": "https://schema.org/NewCondition"
            }
        }`).join('')}
    ]
}`;
    } else if (dataType == 'brands') {
        data = `{
    "@context": "https://schema.org/",
    "@graph": [
        {
            "@id": "https://3dinfinite.com/brands",
            "@type": "Collection",
            "creator": "3d Infinite",
            "hasPart": [${options?.brands?.map(el => `{
                    "@id": "https://3dinfinite.com/brands/${el.slug}"
                }`).join(',')}
            ],
            "name": "Brands"
        }${options?.brands?.map(el => `,{
            "@id": "https://3dinfinite.com/brands/${el.slug}",
            "@type": "Collection",
            "isPartOf": "https://3dinfinite.com/brands",
            "url": "https://3dinfinite.com/brands/${el.slug}",
            "description": ${JSON.stringify(el.description?.replace(/<[^>]+>/g, '') /* remove all tags from string */ || el.name)},
            "name": ${JSON.stringify(el.name || '')}
        }`).join('')}
    ]
}`;
    }

    return (
        <script type="application/ld+json">
            { data }
        </script>
    );
}

export const jsonldFullData = options => (
    <Fragment>
        { jsonldData(options) }
        { jsonldData({ type: 'breadcrumbs', breadcrumbs: options?.breadcrumbs }) }
        { options?.image ? jsonldData({ ...options, type: 'image' }) : '' }
        { jsonldData({ type: 'website' })}
        { jsonldData({ type: 'store' })}
    </Fragment>
);
