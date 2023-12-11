import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [allSeriesData, setAllSeriesData] = useState([]);

  useEffect(() => {
    getAllSeries();
  }, []);

  function getAllSeries() {
    const SHEET_ID = "144JHU_G4XnN7PEGdjZ9WqPhZebbL-zwCxcQXjgVbAuM";
    const SHEET_NAME = "dados";
    const API_KEY = "put_api_key_here";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => formatResponse(json))
      .catch((error) => console.error(error))
      .finally(() => console.log("ALL DONE LOADING DATA"));
  }

  function formatResponse(response) {
    const [keys, ...data] = response.values;
    const formattedData = data.map((arr) => Object.fromEntries(keys.map((key, i) => [key, arr[i]])));
    setAllSeriesData(formattedData);
  }

  return (
    <View style={styles.container}>
      {allSeriesData.length === 0 ? (
        <Text>Carregando ...</Text>
      ) : (
        <FlatList
          data={allSeriesData}
          keyExtractor={(item) => item.Id.toString()} // Replace "Id" with the unique identifier property in your data
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.Descricao}</Text>
              <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemDetail}>{item.Data}</Text>
                <Text style={styles.itemDetail}>{item.Categoria}</Text>
                <Text style={styles.itemDetail}>{item.Valor}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#559",
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    height: 120,
  },
  itemText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  itemDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  itemDetail: {
    color: "#46ED44",
    fontSize: 16,
  },
});
