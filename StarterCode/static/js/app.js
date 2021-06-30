d3.json("data/samples.json").then(data => {
    console.log(data.column_names);
});