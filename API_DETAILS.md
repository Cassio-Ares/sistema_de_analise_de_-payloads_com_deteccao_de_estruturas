
           ||
           \/
//200: createSelectSchema(webhooks),

 createSelectSchema(webhooks).pick


 list => limit e cursor 

 diferença de cursor-based X offset limit 

 paginação infinita


logica api cursor-based para fazer paginação infinita no front 
  const result = await db
       .select({
          id: webhooks.id,
          method: webhooks.method,
          pathname: webhooks.pathname,
          createdAt: webhooks.createdAt,
        })
        .from(webhooks)
        .where(cursor ? lt(webhooks.id, cursor) : undefined)
        .orderBy(desc(webhooks.id))
        .limit(limit + 1);

        const hasMore = result.length > limit;
        const itens = hasMore ? result.slice(0, limit) : result;
        const nextCursor = hasMore ? itens[itens.length - 1].id : null;
