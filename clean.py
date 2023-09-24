import pandas as pd

# Load the data from the CSV file into a DataFrame
df = pd.read_csv('data.csv')
df.columns = df.columns.str.replace(' Rating', '')

# Function to replace consecutive duplicates with blank cells
def remove_consecutive_duplicates(column):
    consecutive_count = 1
    last_value = None
    for i, value in enumerate(column):
        if value == last_value:
            consecutive_count += 1
            if consecutive_count > 3:
                column[i - consecutive_count + 2:i] = [None] * (consecutive_count - 2)
        else:
            consecutive_count = 1
        last_value = value

# Loop through each column and apply the function
for col in df.columns:
    if col != "Phase":
        remove_consecutive_duplicates(df[col])

df= df[df.iloc[-1].sort_values(ascending=False).index]

# Save the modified DataFrame to a new CSV file
###########
df_phase1 = df.loc[df['Phase'] == 1]
df_phase1 = df_phase1.drop("Phase", axis=1)
df_phase1 = df_phase1.drop("FalseSymmetry", axis=1)
df_phase1 = df_phase1.drop("MumboJumbo", axis=1)

for col in df_phase1.columns:
    last_valid_value = df_phase1[col].last_valid_index()  # Find the index of the last valid value
    if last_valid_value is not None:
        df_phase1.at[df_phase1.index[-1], col] = df_phase1.at[last_valid_value, col]

df_phase1.dropna(axis=1, how='all')
df_phase1.to_csv('phase1_modified_data.csv', index=False)

#########
df_phase2 = df.loc[df['Phase'] == 2]
df_phase2 = df_phase2.drop("Phase", axis=1)

for col in df_phase2.columns:
    last_valid_value = df_phase2[col].last_valid_index()  # Find the index of the last valid value
    if last_valid_value is not None:
        df_phase2.at[df_phase2.index[-1], col] = df_phase2.at[last_valid_value, col]

for col in df_phase2.columns:
    first_valid_value = df_phase2[col].first_valid_index()  # Find the index of the first valid value
    if first_valid_value is not None:
        df_phase2.at[df_phase2.index[0], col] = df_phase2.at[first_valid_value, col]

df_phase2.dropna(axis=1, how='all')
df_phase2.to_csv('phase2_modified_data.csv', index=False)


df = df.drop("Phase", axis=1)
df.to_csv('modified_data.csv', index=False)

last_row = df.iloc[-1] 
new_df = pd.DataFrame([last_row])

new_df= new_df[new_df.iloc[0].sort_values(ascending=False).index]
new_df = new_df.drop("Run No.", axis=1)
new_df.to_csv('standings_data.csv', index=False)

new_df = new_df.iloc[:, :5]
new_df.to_csv('standings_data_top_5.csv', index=False)

# Standings Phase 1 
import numpy as np
df = pd.read_csv('data.csv')
df.columns = df.columns.str.replace(' Rating', '')

phase1_standings = df.loc[df["Run No."] == 241] #Currently last phase 1 run was 241
phase2_standings = df.loc[df["Run No."] == 450] #Currently last phase 2 run was 348

phase1_standings = phase1_standings.drop(["Run No.", "Phase"], axis=1)
phase1_standingsT = phase1_standings.T
phase1_standingsT.to_csv("phase1_standingsT.csv", index=True)
phase1_standingsT = pd.read_csv("phase1_standingsT.csv")
phase1_standingsT.rename(columns={phase1_standingsT.columns[0]: "Hermit" }, inplace = True)
phase1_standingsT.rename(columns={phase1_standingsT.columns[1]: "Phase 1" }, inplace = True)

phase1_standingsT['Phase 1'].fillna(1000, inplace=True)


phase1_standingsT = phase1_standingsT.sort_values(by=['Phase 1'], ascending=False)
phase1_standingsT["#p1"] = range(1, 1+len(phase1_standingsT))

phase2_standings = phase2_standings.drop(["Run No.", "Phase"], axis=1)
phase2_standingsT = phase2_standings.T
phase2_standingsT.to_csv("phase2_standingsT.csv", index=True)
phase2_standingsT = pd.read_csv("phase2_standingsT.csv")
phase2_standingsT.rename(columns={phase2_standingsT.columns[0]: "Hermit" }, inplace = True)
phase2_standingsT.rename(columns={phase2_standingsT.columns[1]: "Phase 2" }, inplace = True)

result = pd.concat([phase1_standingsT, phase2_standingsT["Phase 2"]], axis=1)


result = result.sort_values(by=['Phase 2'], ascending=False)
result['#'] = range(1, 1+len(result))
result["↑↓"] = result['#p1']-result['#']

my_order = ["#", "↑↓", "Hermit", "Phase 2", "Phase 1"]
result = result[my_order]

result['Phase 1'] = np.floor(result['Phase 1']).astype(int)
result['Phase 2'] = np.floor(result['Phase 2']).astype(int)

result.to_csv("standings_table_data.csv", index=False)