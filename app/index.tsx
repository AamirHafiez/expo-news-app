import { FlatList, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import Screen from "@/components/molecules/screen/Screen";
import RefreshLogoHeader from "@/components/organisms/screen-header/RefreshLogoHeader";
import { MemoizedHeadlineTab } from "@/components/organisms/headline-tab/HeadlineTab";
import Spacer from "@/components/atoms/spacer/Spacer";
import { SpacerType } from "@/components/atoms/spacer/config";
import useTopHeadlines from "@/hooks/top-headlines/useTopHeadlines";
import { RefreshControl } from "react-native-gesture-handler";
import { ArticleModel } from "@/data/top-headlines/datasource/topHeadlines.model";
import { HeadlineTabActions } from "@/components/organisms/headline-tab/types";
import ThemedText from "@/components/atoms/text/ThemedText";

export default function Index() {
  const {
    isRefreshing,
    listData,
    onUserRefresh,
    onDeleteNewsTab,
    onPinNewsTab,
    onUnpinNewsTab,
    pinnedList,
    error,
  } = useTopHeadlines();

  if (error != null) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>Oops! Something went wrong</ThemedText>
      </View>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <RefreshLogoHeader
                imageSource={require("@/assets/images/splash.png")}
                onRefreshPress={onUserRefresh}
              />
            );
          },
        }}
      />
      <Screen>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={
                listData == null || listData.length <= 0 || isRefreshing
              }
              onRefresh={onUserRefresh}
            />
          }
          data={listData}
          keyExtractor={(item) => item.title}
          ListHeaderComponent={
            pinnedList == null || pinnedList.length <= 0 ? (
              <Spacer type={SpacerType.XS} />
            ) : (
              <PinnedList list={pinnedList} onUnpin={onUnpinNewsTab} />
            )
          }
          ListFooterComponent={<Spacer type={SpacerType.XS} />}
          ItemSeparatorComponent={() => <Spacer type={SpacerType.XS} />}
          renderItem={({ item: article, index }) => (
            <MemoizedHeadlineTab
              onDelete={() => {
                onDeleteNewsTab(article.title);
              }}
              onPinned={() => onPinNewsTab(index)}
              title={article.title}
              urlToImage={article.urlToImage}
              publishedAt={article.publishedAt}
              author={article.author}
              source={article?.source?.name}
              actions={[HeadlineTabActions.DELETE, HeadlineTabActions.PIN]}
            />
          )}
        />
      </Screen>
    </>
  );
}

const PinnedList = ({
  list,
  onUnpin,
}: {
  list: ArticleModel[];
  onUnpin: (title: string) => void;
}) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.title}
      renderItem={({ item: article, index }) => (
        <MemoizedHeadlineTab
          title={article.title}
          urlToImage={article.urlToImage}
          publishedAt={article.publishedAt}
          author={article.author}
          source={article?.source?.name}
          isPinned
          actions={[HeadlineTabActions.UNPIN]}
          onUnpinned={() => onUnpin(article.title)}
        />
      )}
      ListHeaderComponent={() => <Spacer type={SpacerType.XS} />}
      ListFooterComponent={() => <Spacer type={SpacerType.XS} />}
      ItemSeparatorComponent={() => <Spacer type={SpacerType.XS} />}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
