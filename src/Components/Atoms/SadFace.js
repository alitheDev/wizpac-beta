import React from 'react'

function SadFace() {
  return (
    <div className="h-100 position-relative">
    <h4 className="pt-5 mb-5">No Record Found</h4>
    <div class="sadFace mt-5">
      <div class="tear"></div>
      <div class="tear2"></div>
      <div class="face">
        <div class="eyebrow">︶</div>
        <div class="eyebrow">︶</div>
        <div class="eye"></div>
        <div class="eye"></div>
        <div class="mouth"></div>
      </div>
    </div>
  </div>
  )
}

export default SadFace