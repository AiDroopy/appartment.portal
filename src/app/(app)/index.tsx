import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/components/ui';

export default function Feed() {
  const { data, isPending, isError } = usePosts();
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );
  if (isError) {
    return (
      <View>
        <Text> Kunde inte hämta data. </Text>
      </View>
    );
  }
  if (!data) {
    return (
      <View>
        <Text>Finns inget att visa</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyList isLoading={isPending || !data} />}
        estimatedItemSize={300}
      />
    </View>
  );
}
