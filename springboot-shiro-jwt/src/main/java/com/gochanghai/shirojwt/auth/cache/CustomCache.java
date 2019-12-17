package com.gochanghai.shirojwt.auth.cache;

import com.gochanghai.shirojwt.auth.Constant;
import com.gochanghai.shirojwt.util.JwtUtil;
import com.gochanghai.shirojwt.util.PropertiesUtil;
import com.gochanghai.shirojwt.util.RedisUtil;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/***
 * 重写Shiro的Cache保存读取
 * @Auther: changhai.liu
 * @Date: 2019/12/16 17:15
 * @Version : V1.0
 */
public class CustomCache<K,V> implements Cache<K,V> {

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 缓存的key名称获取为shiro:cache:account
     * @param key
     * @return java.lang.String
     * @author dolyw.com
     * @date 2018/9/4 18:33
     */
    private String getKey(Object key) {
        return Constant.PREFIX_SHIRO_CACHE + JwtUtil.getClaim(key.toString(), Constant.ACCOUNT);
    }

    /**
     * 获取缓存
     */
    @Override
    public Object get(Object key) throws CacheException {
        if(!redisUtil.hasKey(this.getKey(key))){
            return null;
        }
        return redisUtil.get(this.getKey(key));
    }

    /**
     * 保存缓存
     */
    @Override
    public Object put(Object key, Object value) throws CacheException {
        // 读取配置文件，获取Redis的Shiro缓存过期时间
        PropertiesUtil.readProperties("config.properties");
        String shiroCacheExpireTime = PropertiesUtil.getProperty("shiroCacheExpireTime");
        // 设置Redis的Shiro缓存
        return redisUtil.set(this.getKey(key), value, Integer.parseInt(shiroCacheExpireTime));
    }

    /**
     * 移除缓存
     */
    @Override
    public Object remove(Object key) throws CacheException {
        if(!redisUtil.hasKey(this.getKey(key))){
            return null;
        }
        redisUtil.del(this.getKey(key));
        return null;
    }

    /**
     * 清空所有缓存
     */
    @Override
    public void clear() throws CacheException {
//        Objects.requireNonNull(JedisUtil.getJedis()).flushDB();
    }

    /**
     * 缓存的个数
     */
    @Override
    public int size() {
//        Long size = Objects.requireNonNull(JedisUtil.getJedis()).dbSize();
//        return size.intValue();
        return 0;
    }

    /**
     * 获取所有的key
     */
    @Override
    public Set keys() {
//        Set<byte[]> keys = Objects.requireNonNull(JedisUtil.getJedis()).keys("*".getBytes());
        Set<Object> set = new HashSet<Object>();
//        for (byte[] bs : keys) {
//            set.add(SerializableUtil.unserializable(bs));
//        }
        return set;
    }

    /**
     * 获取所有的value
     */
    @Override
    public Collection values() {
        Set keys = this.keys();
        List<Object> values = new ArrayList<Object>();
        for (Object key : keys) {
            values.add(redisUtil.get(this.getKey(key)));
        }
        return values;
    }
}