/*
 * Copyright 2019-2029 geekidea(https://github.com/geekidea)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.gochanghai.shirojwt2.service;

import com.gochanghai.shirojwt2.common.service.BaseService;
import com.gochanghai.shirojwt2.common.vo.Paging;
import com.gochanghai.shirojwt2.dto.SysUserQueryParam;
import com.gochanghai.shirojwt2.dto.UpdatePasswordParam;
import com.gochanghai.shirojwt2.entity.SysUser;
import com.gochanghai.shirojwt2.vo.SysUserQueryVo;

import java.io.Serializable;

/**
 * <pre>
 * 系统用户 服务类
 * </pre>
 *
 * @author geekidea
 * @since 2019-10-24
 */
public interface SysUserService extends BaseService<SysUser> {

    /**
     * 保存
     *
     * @param sysUser
     * @return
     * @throws Exception
     */
    boolean saveSysUser(SysUser sysUser) throws Exception;

    /**
     * 修改
     *
     * @param sysUser
     * @return
     * @throws Exception
     */
    boolean updateSysUser(SysUser sysUser) throws Exception;

    /**
     * 删除
     *
     * @param id
     * @return
     * @throws Exception
     */
    boolean deleteSysUser(Long id) throws Exception;

    /**
     * 根据ID获取查询对象
     *
     * @param id
     * @return
     * @throws Exception
     */
    SysUserQueryVo getSysUserById(Serializable id) throws Exception;

    /**
     * 获取分页对象
     *
     * @param sysUserQueryParam
     * @return
     * @throws Exception
     */
    Paging<SysUserQueryVo> getSysUserPageList(SysUserQueryParam sysUserQueryParam) throws Exception;

    /**
     * 判断用户名是否存在
     *
     * @param username
     * @return
     * @throws Exception
     */
    boolean isExistsByUsername(String username) throws Exception;

    /**
     * 检验部门和角色是否存在并且已启用
     *
     * @param departmentId
     * @param roleId
     * @throws Exception
     */
    void checkDepartmentAndRole(Long departmentId, Long roleId) throws Exception;

    /**
     * 通过角色id判断是否存在可用用户id
     *
     * @param roleId
     * @return
     * @throws Exception
     */
    boolean isExistsSysUserByRoleId(Long roleId) throws Exception;

    /**
     * 修改密码
     *
     * @param updatePasswordParam
     * @return
     * @throws Exception
     */
    boolean updatePassword(UpdatePasswordParam updatePasswordParam) throws Exception;

    /**
     * 修改系统用户头像
     *
     * @param id
     * @param headPath
     * @return
     * @throws Exception
     */
    boolean updateSysUserHead(Long id, String headPath) throws Exception;
}
