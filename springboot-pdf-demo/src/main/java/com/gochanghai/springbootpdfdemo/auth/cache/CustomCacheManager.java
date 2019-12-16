package com.gochanghai.springbootpdfdemo.auth.cache;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.apache.shiro.cache.CacheManager;

/***
 * 重写Shiro缓存管理器
 * @Auther: changhai.liu
 * @Date: 2019/12/16 17:19
 * @Version : V1.0
 */
public class CustomCacheManager implements CacheManager {
    @Override
    public <K, V> Cache<K, V> getCache(String s) throws CacheException {
        return new CustomCache<K,V>();
    }
}