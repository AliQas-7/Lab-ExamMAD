
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { surahNames, surahDetails } from './QuranData'; // Importing data from QuranData.js

function QuranSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSurahs, setShowSurahs] = useState(true); // State to track whether to show Surahs or details
    const [darkMode, setDarkMode] = useState(false); // State to track dark mode
    const [namazTime, setNamazTime] = useState("Isha 9:00pm"); // State to track Namaz time

    const handleSearch = (term) => {
        setSearchTerm(term);
        const results = surahNames.filter((surah) =>
            surah.english.toLowerCase().includes(term.toLowerCase()) ||
            surah.arabic.includes(term)
        );
        setSearchResults(results);
    };

    const handleShowSurahs = () => {
        setShowSurahs(true);
    };

    const handleShowJuz = () => {
        setShowSurahs(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={darkMode ? styles.itemDark : styles.item}>
            <Text style={darkMode ? styles.itemTextDark : styles.itemText}>{item.english} - {item.arabic}</Text>
            <Text style={darkMode ? styles.itemSubTextDark : styles.itemSubText}>Meaning: {getSurahMeaning(item.english)}</Text>
            <Text style={darkMode ? styles.itemSubTextDark : styles.itemSubText}>Total Verses: {getTotalVerses(item.english)}</Text>
        </TouchableOpacity>
    );

    const getSurahMeaning = (surahName) => {
        const surahDetail = surahDetails.find(surah => surah.name.english === surahName);
        return surahDetail ? surahDetail.meaning : "";
    };

    const getTotalVerses = (surahName) => {
        const surahDetail = surahDetails.find(surah => surah.name.english === surahName);
        return surahDetail ? surahDetail.totalVerses : "";
    };

    return (
        <View style={darkMode ? styles.containerDark : styles.container}>
            <View style={styles.namazTimeContainer}>
                <Text style={styles.namazTimeText}>{namazTime}</Text>
            </View>
            <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                placeholder="Search Surahs..."
                value={searchTerm}
                onChangeText={handleSearch}
                placeholderTextColor={darkMode ? '#aaa' : '#666'}
            />
            <View style={styles.buttonsContainer}>
                <Button title="Surah" onPress={handleShowSurahs} color="#FF5722" />
                <Button title="Juz" onPress={handleShowJuz} color="#009688" />
                <Button title={darkMode ? "Light Mode" : "Dark Mode"} onPress={toggleDarkMode} color="#03A9F4" />
            </View>
            {showSurahs ? (
               <FlatList
               data={searchTerm ? searchResults : surahNames}
               renderItem={renderItem}
               keyExtractor={(item, index) => index.toString()}
               contentContainerStyle={styles.flatListContent}
               showsVerticalScrollIndicator={false} // Add this line to hide the vertical scroll bar
           />
           
            ) : (
                <FlatList
                    data={surahDetails}
                    renderItem={({ item }) => (
                        <View style={darkMode ? styles.detailsItemDark : styles.detailsItem}>
                            <Text style={darkMode ? styles.detailsTextDark : styles.detailsText}>Surah: {item.name.english}</Text>
                            <Text style={darkMode ? styles.detailsTextDark : styles.detailsText}>Revelation Type: {item.revelationType}</Text>
                            <Text style={darkMode ? styles.detailsTextDark : styles.detailsText}>Total Verses: {item.totalVerses}</Text>
                            <Text style={darkMode ? styles.detailsTextDark : styles.detailsText}>Meaning: {item.meaning}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF59D',
    },
    containerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#37474F',
    },
    namazTimeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC107',
        paddingVertical: 10,
        marginBottom: 20,
        borderRadius: 8,
    },
    namazTimeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#E91E63',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        color: '#000',
    },
    inputDark: {
        color: '#fff',
        borderColor: '#9C27B0',
        backgroundColor: '#673AB7',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#FF9800',
        borderRadius: 8,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        color: '#fff',
    },
    itemSubText: {
        fontSize: 14,
        color: '#fff',
    },
    itemDark: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        backgroundColor: '#009688',
        borderRadius: 8,
        marginBottom: 10,
    },
    itemTextDark: {
        fontSize: 16,
        color: '#fff',
    },
    itemSubTextDark: {
        fontSize: 14,
        color: '#ccc',
    },
    detailsItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    detailsText: {
        fontSize: 16,
    },
    detailsItemDark: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        backgroundColor: '#222',
    },
    detailsTextDark: {
        fontSize: 16,
        color: '#fff',
    },
    flatListContent: {
        paddingBottom: 20,
    },
});

export default QuranSearch