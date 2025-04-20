// import { useRouter } from 'next/router';
import React from 'react';

export default function ProblemLayout({ children }: { children: any }) {
  // const router = useRouter();
  // console.log(router);
  return <main>{React.cloneElement(children, { params: children.props.params })}</main>;
}
