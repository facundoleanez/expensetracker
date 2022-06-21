import React, { useState, FC } from 'react'
import { Appbar, Headline } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { AddExp } from '../components/AddExp'
import { months } from '../constants'

interface NavBarAppProps {
  NavTitle: number
  setVisible: (visible: boolean) => void
}

const NavBarApp: FC<NavBarAppProps> = ({ NavTitle, setVisible }) => {
  const handlePress = () => {
    setVisible(true)
  }

  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action size={50} icon='plus' onPress={handlePress} />
      <Headline>{months[NavTitle]}</Headline>
      <Appbar.Action
        size={40}
        icon='menu'
        onPress={() => console.log('Pressed label')}
      />
      {/* <AddExp /> */}
    </Appbar>
  )
}

export default NavBarApp

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'space-between',
  },
})
