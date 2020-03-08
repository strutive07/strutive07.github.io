---
title:  Permutations
tags: Algorithm
mathjax: true
---


CREATED TIME: Feb 02, 2020 12:59 AM
UPDATED TIME: Feb 02, 2020 1:00 AM
난이도: Medium

class Solution {
    public:
        void solve(vector<int>& nums, int depth, vector<vector<int>>& res){
            if(depth == nums.size() - 1){
                res.push_back(nums);
                return;
            }
            for(int i=depth; i<nums.size(); i++){
                swap(nums[i], nums[depth]);
                solve(nums, depth+1, res);
                swap(nums[i], nums[depth]);
            }
        }
        vector<vector<int>> permute(vector<int>& nums) {
            vector<vector<int>> res;
            solve(nums, 0, res);
            return res;
        }
    };