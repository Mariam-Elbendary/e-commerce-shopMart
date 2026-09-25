"use client"

import { addProductToCart } from '@/api/actions/cart';
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import toast from 'react-hot-toast';

export default function AddBtn({cls , child ,productId} : {cls:string , child:ReactNode , productId:string}) {

const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn : addProductToCart ,
        onSuccess: ()=>{
          toast.success("Product added successfully!");
          queryClient.invalidateQueries({queryKey :["getCart"]})
      },
     onError : ()=>{
      toast.error("Failed , please signin first!");
     }
    })
  return (  
    <>
          <button onClick={()=>{mutate(productId)}}
              className={cls}>
        {child}
     </button>
    </>
  )
}
