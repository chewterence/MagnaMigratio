import json
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
  
# Loading JSON file
fp = open('line_coordinates.json')
data = json.load(fp)

# Lists for dataframes
years_list = []
numEdges_list = []
avg_degree_list = []
total_list = []
yearly_in_degree_map = {}
yearly_out_degree_map = {}

# Discussion 1
# Iterate through each year
for year in data:
    year_data = data[str(year)]
    # Algorithm to extract basic details for each year
    num_edges = len(year_data)
    in_degree_map = {}
    out_degree_map = {}
    nodes = set()
    total = 0
    for row in year_data:
        total += row[3]
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

    yearly_in_degree_map[year] = in_degree_map
    yearly_out_degree_map[year] = out_degree_map
    years_list.append(year)
    numEdges_list.append(num_edges)
    avg_degree_list.append(num_edges / len(nodes))
    total_list.append(total)

# Create dataframes
d = {'Year': years_list,'Average Degree': avg_degree_list, 'total': total_list}
df1 = pd.DataFrame(d)
# Get year with the maximum and minimum average degree
max_avgDegree = max(avg_degree_list)
max_index = avg_degree_list.index(max_avgDegree)
max_avgDegree_year = years_list[max_index]
print("Year: " + max_avgDegree_year + " MAX avg_degree: " + str(max_avgDegree))
min_avgDegree = min(avg_degree_list)
min_index = avg_degree_list.index(min_avgDegree)
min_avgDegree_year = years_list[min_index]
print("Year: " + min_avgDegree_year + " MIN avg_degree: " + str(min_avgDegree))
sns.lineplot(data=df1, x="Year", y="Average Degree").set(title='Line Plot of Average Degree Against Year From 1959-2016')
plt.xticks(
    df1['Year'].iloc[::2], # Odd rows only
    rotation=45,
    horizontalalignment='right',
    fontweight='light'
)
plt.show()

# Discussion 2
# Extract details for in_degree distribution
# Year 1969
map = yearly_in_degree_map['1969']
out_map = yearly_out_degree_map['1969']
countries_list = []
in_degree_list = []
out_countries_list = []
out_degree_list = []
map = dict(sorted(map.items(), key=lambda item: item[1]))
out_map = dict(sorted(out_map.items(), key=lambda item: item[1]))
for country in map:
    countries_list.append(country)
    in_degree_list.append(map[country])
for country in out_map:
    out_countries_list.append(country)
    out_degree_list.append(out_map[country])
d = {'In Degree': in_degree_list, 'Country': countries_list}
df_in_1969 = pd.DataFrame(d)
d = {'Out Degree': out_degree_list, 'Country': out_countries_list}
df_out_1969 = pd.DataFrame(d)
# Year 2014
map = yearly_in_degree_map['2014']
out_map = yearly_out_degree_map['2014']
countries_list = []
in_degree_list = []
out_countries_list = []
out_degree_list = []
map = dict(sorted(map.items(), key=lambda item: item[1]))
out_map = dict(sorted(out_map.items(), key=lambda item: item[1]))
for country in map:
    countries_list.append(country)
    in_degree_list.append(map[country])
for country in out_map:
    out_countries_list.append(country)
    out_degree_list.append(out_map[country])
d = {'In Degree': in_degree_list, 'Country': countries_list}
df_in_2014 = pd.DataFrame(d)
d = {'Out Degree': out_degree_list, 'Country': out_countries_list}
df_out_2014 = pd.DataFrame(d)
# Plot bar graphs
sns.barplot(data=df_out_1969, x="Country", y="Out Degree").set(title='Out-degree Distribution Across Countries in 1969')
plt.xticks(
    rotation=45,
    horizontalalignment='right',
    fontweight='light'
)
plt.show()
sns.barplot(data=df_out_2014, x="Country", y="Out Degree").set(title='Out-degree Distribution Across Countries in 2014')
plt.xticks(
    rotation=45,
    horizontalalignment='right',
    fontweight='light'
)
plt.show()
sns.barplot(data=df_in_1969, x="Country", y="In Degree").set(title='In-degree Distribution Across Countries in 1969')
plt.xticks(
    rotation=45,
    horizontalalignment='right',
    fontweight='light'
)
plt.show()
sns.barplot(data=df_in_2014, x="Country", y="In Degree").set(title='In-degree Distribution Across Countries in 2014')
plt.xticks(
    rotation=45,
    horizontalalignment='right',
    fontweight='light'
)
plt.show()
