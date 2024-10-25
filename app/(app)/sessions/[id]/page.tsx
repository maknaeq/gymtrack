import React from "react";

function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>{params.id}</h1>
      <p>Page content</p>
    </div>
  );
}

export default page;
