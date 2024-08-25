// a component with a List.Accordion that expands and has content
import { Card, IconButton, List } from 'react-native-paper';
import React from 'react';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

const ListAccordion: React.FC<{
  title: string;
  icon: IconSource;
  children: React.ReactNode;
  iniitalExpanded?: boolean;
  hideCard?: boolean;
}> = (p) => {
  const [expanded, setExpanded] = React.useState(false);
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
              <Card.Content>{p.children}</Card.Content>
            </Card>
          )}
        </>
      </List.Accordion>
    </>
  );
};

export default ListAccordion;
