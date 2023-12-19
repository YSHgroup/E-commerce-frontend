import React from 'react';
const ProductDescription = ({data}) => {
  return (
    <div className="row mx-0">
      <div className="d-flex justify-content-center">
        <div className="col-md-8 col-12 col-sm-12">
          <div className="py-5" dangerouslySetInnerHTML={{__html: data}}>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDescription;