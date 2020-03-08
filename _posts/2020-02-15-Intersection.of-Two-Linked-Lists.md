---
title:  Intersection of Two Linked Lists
tags: Algorithm
mathjax: true
---


CREATED TIME: Feb 15, 2020 1:08 AM
UPDATED TIME: Feb 15, 2020 1:09 AM
난이도: Easy

/**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode(int x) : val(x), next(NULL) {}
     * };
     */
    class Solution {
    public:
        ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
            ListNode* p1 = headA;
            ListNode* p2 = headB;
            int len1=0;
            int len2=0;
            
            while(p1 != NULL){
                len1++;
                p1 = p1->next;
            }
            
            while(p2 != NULL){
                len2++;
                p2 = p2->next;
            }
            
            p1 = headA;
            p2 = headB;
            
            if(len1 <= len2){
                for(int i=0; i<(len2-len1); i++){
                    p2 = p2->next;
                }
            }else{
                for(int i=0; i<(len1-len2); i++){
                    p1 = p1->next;
                }
            }
            
            while(p1 != p2){
                p1 = p1->next;
                p2 = p2->next;
            }
            return p1;
        }
    };Intersection of Two Linked Lists