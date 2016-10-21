## Architecture

One does not need to know this in order to use [Join Monster](https://github.com/stems/join-monster). It's a convenient visualization for those who want to dive into the code.

![internals](img/internals.png)

It starts with the parsed AST of the client's GraphQL query. Join Monster gets the fields being requested and finds the corresponding field in the schema definition. From there it grabs that extra metadata needed to generate the SQL. After traversing the whole query AST, an intermediate representation is generated: a hybrid of the GraphQL query and the SQL metadata. We call it the **SQL AST**. This is then compiled to the SQL itself. The SQL AST is also converted to another structure that specifies the **Shape Definition**.

The SQL is then passed to the user-defined function for talking to the database. This function must then return the "raw data", a flat array of all the rows. The Shape Definition is used to nest the data and deduplicate any entities within the rows. The rest of the execution phase proceeds with these new data. The properties on this data tree will have the same names as their respective fields, so children of the resolver that called `joinMonster` know where to find the data.
