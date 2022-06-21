import React, { FC } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Surface, Text } from 'react-native-paper'

const scrStyles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
  },
  surface: {
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    margin: 20,
    borderRadius: 80,
  },
})

interface ScrollableMainProps {
  data: string[]
}

export const ScrollableMain: FC<ScrollableMainProps> = ({ data }) => {
  return (
    <ScrollView contentContainerStyle={scrStyles.bottom}>
      {data.map((month) => (
        <Surface style={scrStyles.surface}>
          <Text style={{ fontSize: 40 }}>{month}</Text>
          <Text>$250</Text>
        </Surface>
      ))}
    </ScrollView>
  )
}
