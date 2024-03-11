// These are the data structures that represend our data. The Data is generated in the DataGenerator file

export interface TabData{
    // Each TabData element has a name that is also the tab name
    name: string
    // All Attributes are stored as KeyValuePairs
    data: KeyValuePair[]
}

export interface KeyValuePair {
    key: string;
    value: string;
}
