import json
  
# Loading JSON file
fp = open('line_coordinates.json')
data = json.load(fp)

# Select a year
year = 1992
data_year = data[str(year)]

# Algorithm to extract basic details
num_edges = len(data_year)
in_degree_map = {}
out_degree_map = {}
nodes = set()
for row in data_year:
    vertex_origin = row[4]
    vertex_destination = row[5]
    nodes.add(vertex_origin)
    nodes.add(vertex_destination)
    if vertex_origin in out_degree_map:
        out_degree_map[vertex_origin] += 1
    else:
        out_degree_map[vertex_origin] = 1
    if vertex_destination in in_degree_map:
        in_degree_map[vertex_destination] += 1
    else:
        in_degree_map[vertex_destination] = 1
    
num_nodes = len(nodes)

print(num_nodes)
print(num_edges)
print(out_degree_map)