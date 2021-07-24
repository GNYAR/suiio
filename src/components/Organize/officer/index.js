import React from 'react'
import { Authority } from './Authority';
import { OfficerList } from './OfficerList';

const officers = {
  會長: "1110634001",
  副會長: "1110634002",
  活動長: "1110634005",
  公關長: "1110634006",
  財務長: "1110634003",
  器材長: "1110634004",
  生活長: "1110634008",
  資訊長: "1110634007"
};
const authorities = {
  組織負責人: ["會長", "副會長"],
  財務負責人: ["財務長", "副會長"],
  會議記錄人: ["資訊長", "副會長"],
}


export const Officer = () => {
  return (
    <>
      <OfficerList officers={officers} />
      <Authority authorities={authorities} officers={officers} />
    </>
  )
}