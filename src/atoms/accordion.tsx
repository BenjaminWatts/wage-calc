// a component with a List.Accordion that expands and has content
import { Card, IconButton, List } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

const ListAccordion: React.FC<{
  title: string;
  icon: IconSource;
  children: React.ReactNode;
  iniitalExpanded?: boolean;
  hideCard?: boolean;
}> = (p) => {
  const [expanded, setExpanded] = React.useState(p.iniitalExpanded ?? false);
  return (
    <>
      <List.Accordion
        title={p.title}
        onPress={() => setExpanded(!expanded)}
        left={(props) => <IconButton icon={p.icon} {...props} />}
      >
        <>
          {p.hideCard ? (
            <>{p.children}</>
          ) : (
            <Card>
              <Card.Content>
                <View style={styles.container}>{p.children}</View>
              </Card.Content>
            </Card>
          )}
        </>
      </List.Accordion>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ListAccordion;
