// Create metadata for a given sample
function buildMetadata(selection) {
  
    d3.json("samples.json").then((sampleData) => {

            console.log(sampleData);

            // Parse the data
            var parsedata = sampleData.metadata;
            var sample = parsedata.filter(item => item.id == selection);
            
            // Update the metadata
            var metadata = d3.select("#sample-metadata").html("");

            Object.entries(sample[0]).forEach(([key, value]) => {
                metadata.append("p").text(`${key}: ${value}`);
            });

            console.log(metadata);
    });
}

// Build interactive charts
function buildCharts(selection) {

    d3.json("samples.json").then((sampleData) => {

        var parsedata = sampleData.samples;
        var sample_dict = parsedata.filter(item => item.id == selection)[0];
        var sample_values = sample_dict.sample_values;
        var barchart_values = sample_values.slice(0, 10).reverse();
        var id_values = sample_dict.otu_ids;
        var barchart_labels = id_values.slice(0, 10).reverse();
        var hovertext = sample_dict.otu_labels;
        var barchart_hovertext = hovertext.slice(0, 10).reverse();

        // Place and fill barchart
        var barchart_trace = {
            type: "bar",
            y: barchart_labels,
            x: barchart_values,
            text: barchart_hovertext,
            orientation: 'h'
        };
        var barchart_data = [barchart_trace];
        Plotly.newPlot("bar", barchart_data);

        // Place and fill bubble chart
        var bubblechart_trace = {
            x: id_values,
            y: sample_values,
            text: hovertext,
            mode: "markers",
            marker: {
                color: id_values,
                size: sample_values
            }
        };
        var bubblechart_data = [bubblechart_trace];
        var layout = {
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubblechart_data, layout);
    });
}

// Initialization function
function init() {

    d3.json("samples.json").then((sampleData) => {

        var parsedata = sampleData.names;
        var dropdownMenu = d3.select("#selDataset");
        parsedata.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })

        buildMetadata(parsedata[0]);
        buildCharts(parsedata[0]);
    });
}

// Update function
function optionChanged(newSelection) {

    buildMetadata(newSelection);
    buildCharts(newSelection);
}

init();