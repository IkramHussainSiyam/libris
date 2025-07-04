
/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// @ts-nocheck 
/**
 * This file exports the `CustomList` model and its related types.
 *
 * 🟢 You can import this file directly.
 */
import * as runtime from "@prisma/client/runtime/library"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

/**
 * Model CustomList
 * 
 */
export type CustomListModel = runtime.Types.Result.DefaultSelection<Prisma.$CustomListPayload>

export type AggregateCustomList = {
  _count: CustomListCountAggregateOutputType | null
  _min: CustomListMinAggregateOutputType | null
  _max: CustomListMaxAggregateOutputType | null
}

export type CustomListMinAggregateOutputType = {
  id: string | null
  name: string | null
  user_ID: string | null
  created_at: Date | null
  updated_at: Date | null
}

export type CustomListMaxAggregateOutputType = {
  id: string | null
  name: string | null
  user_ID: string | null
  created_at: Date | null
  updated_at: Date | null
}

export type CustomListCountAggregateOutputType = {
  id: number
  name: number
  user_ID: number
  created_at: number
  updated_at: number
  _all: number
}


export type CustomListMinAggregateInputType = {
  id?: true
  name?: true
  user_ID?: true
  created_at?: true
  updated_at?: true
}

export type CustomListMaxAggregateInputType = {
  id?: true
  name?: true
  user_ID?: true
  created_at?: true
  updated_at?: true
}

export type CustomListCountAggregateInputType = {
  id?: true
  name?: true
  user_ID?: true
  created_at?: true
  updated_at?: true
  _all?: true
}

export type CustomListAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which CustomList to aggregate.
   */
  where?: Prisma.CustomListWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of CustomLists to fetch.
   */
  orderBy?: Prisma.CustomListOrderByWithRelationInput | Prisma.CustomListOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the start position
   */
  cursor?: Prisma.CustomListWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` CustomLists from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` CustomLists.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Count returned CustomLists
  **/
  _count?: true | CustomListCountAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the minimum value
  **/
  _min?: CustomListMinAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the maximum value
  **/
  _max?: CustomListMaxAggregateInputType
}

export type GetCustomListAggregateType<T extends CustomListAggregateArgs> = {
      [P in keyof T & keyof AggregateCustomList]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateCustomList[P]>
    : Prisma.GetScalarType<T[P], AggregateCustomList[P]>
}




export type CustomListGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.CustomListWhereInput
  orderBy?: Prisma.CustomListOrderByWithAggregationInput | Prisma.CustomListOrderByWithAggregationInput[]
  by: Prisma.CustomListScalarFieldEnum[] | Prisma.CustomListScalarFieldEnum
  having?: Prisma.CustomListScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: CustomListCountAggregateInputType | true
  _min?: CustomListMinAggregateInputType
  _max?: CustomListMaxAggregateInputType
}

export type CustomListGroupByOutputType = {
  id: string
  name: string
  user_ID: string
  created_at: Date
  updated_at: Date
  _count: CustomListCountAggregateOutputType | null
  _min: CustomListMinAggregateOutputType | null
  _max: CustomListMaxAggregateOutputType | null
}

type GetCustomListGroupByPayload<T extends CustomListGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<CustomListGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof CustomListGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], CustomListGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], CustomListGroupByOutputType[P]>
      }
    >
  > 



export type CustomListWhereInput = {
  AND?: Prisma.CustomListWhereInput | Prisma.CustomListWhereInput[]
  OR?: Prisma.CustomListWhereInput[]
  NOT?: Prisma.CustomListWhereInput | Prisma.CustomListWhereInput[]
  id?: Prisma.StringFilter<"CustomList"> | string
  name?: Prisma.StringFilter<"CustomList"> | string
  user_ID?: Prisma.StringFilter<"CustomList"> | string
  created_at?: Prisma.DateTimeFilter<"CustomList"> | Date | string
  updated_at?: Prisma.DateTimeFilter<"CustomList"> | Date | string
}

export type CustomListOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  user_ID?: Prisma.SortOrder
  created_at?: Prisma.SortOrder
  updated_at?: Prisma.SortOrder
}

export type CustomListWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  AND?: Prisma.CustomListWhereInput | Prisma.CustomListWhereInput[]
  OR?: Prisma.CustomListWhereInput[]
  NOT?: Prisma.CustomListWhereInput | Prisma.CustomListWhereInput[]
  name?: Prisma.StringFilter<"CustomList"> | string
  user_ID?: Prisma.StringFilter<"CustomList"> | string
  created_at?: Prisma.DateTimeFilter<"CustomList"> | Date | string
  updated_at?: Prisma.DateTimeFilter<"CustomList"> | Date | string
}, "id">

export type CustomListOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  user_ID?: Prisma.SortOrder
  created_at?: Prisma.SortOrder
  updated_at?: Prisma.SortOrder
  _count?: Prisma.CustomListCountOrderByAggregateInput
  _max?: Prisma.CustomListMaxOrderByAggregateInput
  _min?: Prisma.CustomListMinOrderByAggregateInput
}

export type CustomListScalarWhereWithAggregatesInput = {
  AND?: Prisma.CustomListScalarWhereWithAggregatesInput | Prisma.CustomListScalarWhereWithAggregatesInput[]
  OR?: Prisma.CustomListScalarWhereWithAggregatesInput[]
  NOT?: Prisma.CustomListScalarWhereWithAggregatesInput | Prisma.CustomListScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"CustomList"> | string
  name?: Prisma.StringWithAggregatesFilter<"CustomList"> | string
  user_ID?: Prisma.StringWithAggregatesFilter<"CustomList"> | string
  created_at?: Prisma.DateTimeWithAggregatesFilter<"CustomList"> | Date | string
  updated_at?: Prisma.DateTimeWithAggregatesFilter<"CustomList"> | Date | string
}

export type CustomListCreateInput = {
  id?: string
  name: string
  user_ID: string
  created_at?: Date | string
  updated_at?: Date | string
}

export type CustomListUncheckedCreateInput = {
  id?: string
  name: string
  user_ID: string
  created_at?: Date | string
  updated_at?: Date | string
}

export type CustomListUpdateInput = {
  name?: Prisma.StringFieldUpdateOperationsInput | string
  user_ID?: Prisma.StringFieldUpdateOperationsInput | string
  created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CustomListUncheckedUpdateInput = {
  name?: Prisma.StringFieldUpdateOperationsInput | string
  user_ID?: Prisma.StringFieldUpdateOperationsInput | string
  created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CustomListCreateManyInput = {
  id?: string
  name: string
  user_ID: string
  created_at?: Date | string
  updated_at?: Date | string
}

export type CustomListUpdateManyMutationInput = {
  name?: Prisma.StringFieldUpdateOperationsInput | string
  user_ID?: Prisma.StringFieldUpdateOperationsInput | string
  created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CustomListUncheckedUpdateManyInput = {
  name?: Prisma.StringFieldUpdateOperationsInput | string
  user_ID?: Prisma.StringFieldUpdateOperationsInput | string
  created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CustomListCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  user_ID?: Prisma.SortOrder
  created_at?: Prisma.SortOrder
  updated_at?: Prisma.SortOrder
}

export type CustomListMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  user_ID?: Prisma.SortOrder
  created_at?: Prisma.SortOrder
  updated_at?: Prisma.SortOrder
}

export type CustomListMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  user_ID?: Prisma.SortOrder
  created_at?: Prisma.SortOrder
  updated_at?: Prisma.SortOrder
}



export type CustomListSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  name?: boolean
  user_ID?: boolean
  created_at?: boolean
  updated_at?: boolean
}, ExtArgs["result"]["customList"]>



export type CustomListSelectScalar = {
  id?: boolean
  name?: boolean
  user_ID?: boolean
  created_at?: boolean
  updated_at?: boolean
}

export type CustomListOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "user_ID" | "created_at" | "updated_at", ExtArgs["result"]["customList"]>

export type $CustomListPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "CustomList"
  objects: {}
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    name: string
    user_ID: string
    created_at: Date
    updated_at: Date
  }, ExtArgs["result"]["customList"]>
  composites: {}
}

export type CustomListGetPayload<S extends boolean | null | undefined | CustomListDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CustomListPayload, S>

export type CustomListCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<CustomListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CustomListCountAggregateInputType | true
  }

export interface CustomListDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomList'], meta: { name: 'CustomList' } }
  /**
   * Find zero or one CustomList that matches the filter.
   * @param {CustomListFindUniqueArgs} args - Arguments to find a CustomList
   * @example
   * // Get one CustomList
   * const customList = await prisma.customList.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUnique<T extends CustomListFindUniqueArgs>(args: Prisma.SelectSubset<T, CustomListFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CustomListClient<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find one CustomList that matches the filter or throw an error with `error.code='P2025'`
   * if no matches were found.
   * @param {CustomListFindUniqueOrThrowArgs} args - Arguments to find a CustomList
   * @example
   * // Get one CustomList
   * const customList = await prisma.customList.findUniqueOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUniqueOrThrow<T extends CustomListFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CustomListFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomListClient<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first CustomList that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {CustomListFindFirstArgs} args - Arguments to find a CustomList
   * @example
   * // Get one CustomList
   * const customList = await prisma.customList.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirst<T extends CustomListFindFirstArgs>(args?: Prisma.SelectSubset<T, CustomListFindFirstArgs<ExtArgs>>): Prisma.Prisma__CustomListClient<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first CustomList that matches the filter or
   * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {CustomListFindFirstOrThrowArgs} args - Arguments to find a CustomList
   * @example
   * // Get one CustomList
   * const customList = await prisma.customList.findFirstOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirstOrThrow<T extends CustomListFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CustomListFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomListClient<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find zero or more CustomLists that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {CustomListFindManyArgs} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CustomLists
   * const customLists = await prisma.customList.findMany()
   * 
   * // Get first 10 CustomLists
   * const customLists = await prisma.customList.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const customListWithIdOnly = await prisma.customList.findMany({ select: { id: true } })
   * 
   */
  findMany<T extends CustomListFindManyArgs>(args?: Prisma.SelectSubset<T, CustomListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  /**
   * Create a CustomList.
   * @param {CustomListCreateArgs} args - Arguments to create a CustomList.
   * @example
   * // Create one CustomList
   * const CustomList = await prisma.customList.create({
   *   data: {
   *     // ... data to create a CustomList
   *   }
   * })
   * 
   */
  create<T extends CustomListCreateArgs>(args: Prisma.SelectSubset<T, CustomListCreateArgs<ExtArgs>>): Prisma.Prisma__CustomListClient<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Create many CustomLists.
   * @param {CustomListCreateManyArgs} args - Arguments to create many CustomLists.
   * @example
   * // Create many CustomLists
   * const customList = await prisma.customList.createMany({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   *     
   */
  createMany<T extends CustomListCreateManyArgs>(args?: Prisma.SelectSubset<T, CustomListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Delete a CustomList.
   * @param {CustomListDeleteArgs} args - Arguments to delete one CustomList.
   * @example
   * // Delete one CustomList
   * const CustomList = await prisma.customList.delete({
   *   where: {
   *     // ... filter to delete one CustomList
   *   }
   * })
   * 
   */
  delete<T extends CustomListDeleteArgs>(args: Prisma.SelectSubset<T, CustomListDeleteArgs<ExtArgs>>): Prisma.Prisma__CustomListClient<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Update one CustomList.
   * @param {CustomListUpdateArgs} args - Arguments to update one CustomList.
   * @example
   * // Update one CustomList
   * const customList = await prisma.customList.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  update<T extends CustomListUpdateArgs>(args: Prisma.SelectSubset<T, CustomListUpdateArgs<ExtArgs>>): Prisma.Prisma__CustomListClient<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Delete zero or more CustomLists.
   * @param {CustomListDeleteManyArgs} args - Arguments to filter CustomLists to delete.
   * @example
   * // Delete a few CustomLists
   * const { count } = await prisma.customList.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
   */
  deleteMany<T extends CustomListDeleteManyArgs>(args?: Prisma.SelectSubset<T, CustomListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more CustomLists.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {CustomListUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CustomLists
   * const customList = await prisma.customList.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  updateMany<T extends CustomListUpdateManyArgs>(args: Prisma.SelectSubset<T, CustomListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Create or update one CustomList.
   * @param {CustomListUpsertArgs} args - Arguments to update or create a CustomList.
   * @example
   * // Update or create a CustomList
   * const customList = await prisma.customList.upsert({
   *   create: {
   *     // ... data to create a CustomList
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CustomList we want to update
   *   }
   * })
   */
  upsert<T extends CustomListUpsertArgs>(args: Prisma.SelectSubset<T, CustomListUpsertArgs<ExtArgs>>): Prisma.Prisma__CustomListClient<runtime.Types.Result.GetResult<Prisma.$CustomListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find zero or more CustomLists that matches the filter.
   * @param {CustomListFindRawArgs} args - Select which filters you would like to apply.
   * @example
   * const customList = await prisma.customList.findRaw({
   *   filter: { age: { $gt: 25 } }
   * })
   */
  findRaw(args?: Prisma.CustomListFindRawArgs): Prisma.PrismaPromise<Prisma.JsonObject>

  /**
   * Perform aggregation operations on a CustomList.
   * @param {CustomListAggregateRawArgs} args - Select which aggregations you would like to apply.
   * @example
   * const customList = await prisma.customList.aggregateRaw({
   *   pipeline: [
   *     { $match: { status: "registered" } },
   *     { $group: { _id: "$country", total: { $sum: 1 } } }
   *   ]
   * })
   */
  aggregateRaw(args?: Prisma.CustomListAggregateRawArgs): Prisma.PrismaPromise<Prisma.JsonObject>


  /**
   * Count the number of CustomLists.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {CustomListCountArgs} args - Arguments to filter CustomLists to count.
   * @example
   * // Count the number of CustomLists
   * const count = await prisma.customList.count({
   *   where: {
   *     // ... the filter for the CustomLists we want to count
   *   }
   * })
  **/
  count<T extends CustomListCountArgs>(
    args?: Prisma.Subset<T, CustomListCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], CustomListCountAggregateOutputType>
      : number
  >

  /**
   * Allows you to perform aggregations operations on a CustomList.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {CustomListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 users
   * const aggregations = await prisma.user.aggregate({
   *   _avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
  **/
  aggregate<T extends CustomListAggregateArgs>(args: Prisma.Subset<T, CustomListAggregateArgs>): Prisma.PrismaPromise<GetCustomListAggregateType<T>>

  /**
   * Group by CustomList.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {CustomListGroupByArgs} args - Group by arguments.
   * @example
   * // Group by city, order by createdAt, get count
   * const result = await prisma.user.groupBy({
   *   by: ['city', 'createdAt'],
   *   orderBy: {
   *     createdAt: true
   *   },
   *   _count: {
   *     _all: true
   *   },
   * })
   * 
  **/
  groupBy<
    T extends CustomListGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: CustomListGroupByArgs['orderBy'] }
      : { orderBy?: CustomListGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
          : [
              Error,
              'Field ',
              P,
              ` in "having" needs to be provided in "by"`,
            ]
      }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
      }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, CustomListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
/**
 * Fields of the CustomList model
 */
readonly fields: CustomListFieldRefs;
}

/**
 * The delegate class that acts as a "Promise-like" for CustomList.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CustomListClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}




/**
 * Fields of the CustomList model
 */
export interface CustomListFieldRefs {
  readonly id: Prisma.FieldRef<"CustomList", 'String'>
  readonly name: Prisma.FieldRef<"CustomList", 'String'>
  readonly user_ID: Prisma.FieldRef<"CustomList", 'String'>
  readonly created_at: Prisma.FieldRef<"CustomList", 'DateTime'>
  readonly updated_at: Prisma.FieldRef<"CustomList", 'DateTime'>
}
    

// Custom InputTypes
/**
 * CustomList findUnique
 */
export type CustomListFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * Filter, which CustomList to fetch.
   */
  where: Prisma.CustomListWhereUniqueInput
}

/**
 * CustomList findUniqueOrThrow
 */
export type CustomListFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * Filter, which CustomList to fetch.
   */
  where: Prisma.CustomListWhereUniqueInput
}

/**
 * CustomList findFirst
 */
export type CustomListFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * Filter, which CustomList to fetch.
   */
  where?: Prisma.CustomListWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of CustomLists to fetch.
   */
  orderBy?: Prisma.CustomListOrderByWithRelationInput | Prisma.CustomListOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for CustomLists.
   */
  cursor?: Prisma.CustomListWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` CustomLists from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` CustomLists.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of CustomLists.
   */
  distinct?: Prisma.CustomListScalarFieldEnum | Prisma.CustomListScalarFieldEnum[]
}

/**
 * CustomList findFirstOrThrow
 */
export type CustomListFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * Filter, which CustomList to fetch.
   */
  where?: Prisma.CustomListWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of CustomLists to fetch.
   */
  orderBy?: Prisma.CustomListOrderByWithRelationInput | Prisma.CustomListOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for CustomLists.
   */
  cursor?: Prisma.CustomListWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` CustomLists from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` CustomLists.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of CustomLists.
   */
  distinct?: Prisma.CustomListScalarFieldEnum | Prisma.CustomListScalarFieldEnum[]
}

/**
 * CustomList findMany
 */
export type CustomListFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * Filter, which CustomLists to fetch.
   */
  where?: Prisma.CustomListWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of CustomLists to fetch.
   */
  orderBy?: Prisma.CustomListOrderByWithRelationInput | Prisma.CustomListOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for listing CustomLists.
   */
  cursor?: Prisma.CustomListWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` CustomLists from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` CustomLists.
   */
  skip?: number
  distinct?: Prisma.CustomListScalarFieldEnum | Prisma.CustomListScalarFieldEnum[]
}

/**
 * CustomList create
 */
export type CustomListCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * The data needed to create a CustomList.
   */
  data: Prisma.XOR<Prisma.CustomListCreateInput, Prisma.CustomListUncheckedCreateInput>
}

/**
 * CustomList createMany
 */
export type CustomListCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to create many CustomLists.
   */
  data: Prisma.CustomListCreateManyInput | Prisma.CustomListCreateManyInput[]
}

/**
 * CustomList update
 */
export type CustomListUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * The data needed to update a CustomList.
   */
  data: Prisma.XOR<Prisma.CustomListUpdateInput, Prisma.CustomListUncheckedUpdateInput>
  /**
   * Choose, which CustomList to update.
   */
  where: Prisma.CustomListWhereUniqueInput
}

/**
 * CustomList updateMany
 */
export type CustomListUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to update CustomLists.
   */
  data: Prisma.XOR<Prisma.CustomListUpdateManyMutationInput, Prisma.CustomListUncheckedUpdateManyInput>
  /**
   * Filter which CustomLists to update
   */
  where?: Prisma.CustomListWhereInput
  /**
   * Limit how many CustomLists to update.
   */
  limit?: number
}

/**
 * CustomList upsert
 */
export type CustomListUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * The filter to search for the CustomList to update in case it exists.
   */
  where: Prisma.CustomListWhereUniqueInput
  /**
   * In case the CustomList found by the `where` argument doesn't exist, create a new CustomList with this data.
   */
  create: Prisma.XOR<Prisma.CustomListCreateInput, Prisma.CustomListUncheckedCreateInput>
  /**
   * In case the CustomList was found with the provided `where` argument, update it with this data.
   */
  update: Prisma.XOR<Prisma.CustomListUpdateInput, Prisma.CustomListUncheckedUpdateInput>
}

/**
 * CustomList delete
 */
export type CustomListDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
  /**
   * Filter which CustomList to delete.
   */
  where: Prisma.CustomListWhereUniqueInput
}

/**
 * CustomList deleteMany
 */
export type CustomListDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which CustomLists to delete
   */
  where?: Prisma.CustomListWhereInput
  /**
   * Limit how many CustomLists to delete.
   */
  limit?: number
}

/**
 * CustomList findRaw
 */
export type CustomListFindRawArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
   */
  filter?: runtime.InputJsonValue
  /**
   * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
   */
  options?: runtime.InputJsonValue
}

/**
 * CustomList aggregateRaw
 */
export type CustomListAggregateRawArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
   */
  pipeline?: runtime.InputJsonValue[]
  /**
   * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
   */
  options?: runtime.InputJsonValue
}

/**
 * CustomList without action
 */
export type CustomListDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the CustomList
   */
  select?: Prisma.CustomListSelect<ExtArgs> | null
  /**
   * Omit specific fields from the CustomList
   */
  omit?: Prisma.CustomListOmit<ExtArgs> | null
}
