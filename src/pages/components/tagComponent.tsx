import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, Tooltip } from "antd";
import { runInAction } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { FC } from "react";
import styles from "./index.module.scss";

interface TagProps {
  sourceData: string[];
  refreshData: (data: string[]) => void;
}

const TagComponent: FC<TagProps> = ({ sourceData, refreshData }) => {
  const store = useLocalStore(() => ({
    editInputIndex: -1,
    editInputValue: "",
    inputVisible: false,
    inputValue: "",
    showInput: () => {
      store.inputVisible = true;
    },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      store.inputValue = e.target.value;
    },
    handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      store.editInputValue = e.target.value;
    },
  }));
  const handleClose = (removedTag: string, oindex: number) => {
    const newTags = [...sourceData];
    const index = newTags.findIndex(
      (tag, i) => tag === removedTag && oindex === i
    );
    newTags.splice(index, 1);
    // const tags = sourceData.filter((tag, i) => tag !== removedTag && oindex !== i);
    refreshData(newTags);
  };
  const handleInputConfirm = () => {
    const inputValue = store.inputValue;
    let tags = [...sourceData];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    refreshData(tags);
    runInAction(() => {
      store.inputVisible = false;
      store.inputValue = "";
    });
  };

  const handleEditInputConfirm = () => {
    const newTags = [...sourceData];
    newTags[store.editInputIndex] = store.editInputValue;
    refreshData(newTags);
    runInAction(() => {
      store.editInputIndex = -1;
      store.editInputValue = "";
    });
  };

  return useObserver(() => (
    <>
      {sourceData.map((tag, index) => {
        if (store.editInputIndex === index) {
          return (
            <Input
              key={index}
              size="small"
              className={styles.tag_input}
              value={store.editInputValue}
              onChange={store.handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            visible
            key={index}
            closable
            onClose={() => handleClose(tag, index)}
          >
            <span
              onDoubleClick={(e) => {
                runInAction(() => {
                  store.editInputIndex = index;
                  store.editInputValue = tag;
                });
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={index}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {store.inputVisible && (
        <Input
          type="text"
          size="small"
          className={styles.tag_input}
          value={store.inputValue}
          onChange={store.handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!store.inputVisible && (
        <Tag className="site-tag-plus" onClick={store.showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  ));
};

export default TagComponent;
